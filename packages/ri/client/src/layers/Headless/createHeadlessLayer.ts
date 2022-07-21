import {
  defineComponent,
  Type,
  namespaceWorld,
  EntityIndex,
  getComponentValue,
  EntityID,
  hasComponent,
} from "@latticexyz/recs";
import { NetworkLayer } from "../Network";
import { createActionSystem, createCurrentStaminaSystem } from "./systems";
import { defineActionComponent } from "./components";
import { joinGame, moveEntity, attackEntity } from "./api";
import { curry } from "lodash";
import { createTurnStream } from "./setup";
import { isOwnedByCaller } from "@latticexyz/std-client";
import { manhattan } from "../../utils/distance";

/**
 * The Headless layer is the second layer in the client architecture and extends the Network layer.
 * Its purpose is to provide an API that allows the game to be played programatically.
 */

export async function createHeadlessLayer(network: NetworkLayer) {
  const world = namespaceWorld(network.world, "headless");
  const {
    components: { GameConfig, Position, OwnedBy, Inventory, ResourceGenerator, Health, EscapePortal },
    utils: { getItems },
    network: { clock },
  } = network;

  const Action = defineActionComponent(world);
  const LocalStamina = defineComponent(world, { current: Type.Number }, { id: "LocalStamina" });
  const components = { Action, LocalStamina };

  const actions = createActionSystem(world, Action, network.txReduced$);

  const turn$ = createTurnStream(world, GameConfig, clock);

  function closeEnough(entity1: EntityIndex, entity2: EntityIndex) {
    const position1 = getComponentValue(Position, entity1);
    const position2 = getComponentValue(Position, entity2);

    if (position1 && position2 && manhattan(position1, position2) <= 1) {
      return true;
    }
    return false;
  }

  const canGatherResource = (generator: EntityIndex, gatherer: EntityIndex) => {
    if (!closeEnough(generator, gatherer)) return false;

    const inventory = getComponentValue(Inventory, gatherer);
    if (inventory == null) return false;

    const resourceGenerator = getComponentValue(ResourceGenerator, generator);
    if (!resourceGenerator) return false;

    return true;
  };

  const canGiveInventory = (inventoryOwnerEntity: EntityIndex, receiverEntity: EntityIndex) => {
    if (!closeEnough(inventoryOwnerEntity, receiverEntity)) return false;

    const inventoryOwnerItems = getItems(inventoryOwnerEntity);
    if (inventoryOwnerItems.length === 0) return false;

    const receiverInventory = getInventory(receiverEntity);
    if (!receiverInventory || receiverInventory.isFull()) return false;

    return true;
  };

  const canTakeInventory = (inventoryOwnerEntity: EntityIndex, receiverEntity: EntityIndex) => {
    if (hasComponent(OwnedBy, inventoryOwnerEntity)) return false;
    return canGiveInventory(inventoryOwnerEntity, receiverEntity);
  };

  const getInventory = (entity: EntityIndex) => {
    const capacity = getComponentValue(Inventory, entity)?.value;
    if (capacity == null) return;

    const items = getItems(entity);
    const isFull = () => items.length >= capacity;

    return {
      capacity,
      items,
      isFull,
    };
  };

  const canAttack = (attacker: EntityIndex, defender: EntityIndex) => {
    if (!closeEnough(attacker, defender)) return false;

    const attackerOwner = getComponentValue(OwnedBy, attacker);
    const defenderOwner = getComponentValue(OwnedBy, defender);

    if (!attackerOwner) return false;
    if (attackerOwner.value === defenderOwner?.value) return false;

    const health = getComponentValue(Health, defender);
    if (!health) return false;

    return true;
  };

  const canEscapePortal = (entity: EntityIndex, portalEntity: EntityIndex) => {
    if (!closeEnough(entity, portalEntity)) return false;
    const escapePortalValue = getComponentValue(EscapePortal, portalEntity);
    if (!escapePortalValue) return false;

    return true;
  };

  const layer = {
    world,
    actions,
    parentLayers: { network },
    components,
    turn$,
    api: {
      joinGame: curry(joinGame)(network, actions),
      moveEntity: curry(moveEntity)({ world, actions, network, LocalStamina }),
      attackEntity: curry(attackEntity)({ network, actions }),
      canGatherResource,
      canTakeInventory,
      canGiveInventory,
      canAttack,
      canEscapePortal,
    },
  };

  createCurrentStaminaSystem(layer);

  return layer;
}

import {
  Has,
  defineSyncSystem,
  setComponent,
  defineComponentSystem,
  getComponentValueStrict,
  getComponentValue,
} from "@latticexyz/recs";
import { LocalLayer } from "../../types";
import { UnitTypeNames, StructureTypeNames, ItemTypeNames, ItemTypes } from "../../../Network/types";

/**
 * The Sync system handles adding Local layer components to entites based on components they have on parent layers
 */
export function createSyncSystem(layer: LocalLayer) {
  const {
    world,
    parentLayers: {
      network: {
        components: { ItemType, UnitType, StructureType, Movable, LuckGem },
      },
    },
    components: { MoveSpeed, Selectable, Name },
  } = layer;

  defineSyncSystem(
    world,
    [Has(Movable)],
    () => MoveSpeed,
    () => ({ default: 1000, current: 1000 })
  );

  defineSyncSystem(
    world,
    [Has(UnitType)],
    () => Selectable,
    () => ({ value: true })
  );

  defineSyncSystem(
    world,
    [Has(StructureType)],
    () => Selectable,
    () => ({ value: true })
  );

  defineSyncSystem(
    world,
    [Has(ItemType)],
    () => Selectable,
    () => ({ value: true })
  );

  defineComponentSystem(world, UnitType, ({ entity, value }) => {
    const [newValue] = value;
    const type = newValue?.value;
    if (type == null) return;

    let name = "Unknown";
    if (UnitTypeNames[type]) name = UnitTypeNames[type];

    setComponent(Name, entity, { value: name });
  });

  defineComponentSystem(world, StructureType, ({ entity, value }) => {
    const [newValue] = value;
    const type = newValue?.value;
    if (type == null) return;

    let name = "Unknown";
    if (StructureTypeNames[type]) name = StructureTypeNames[type];

    setComponent(Name, entity, { value: name });
  });

  defineComponentSystem(world, ItemType, ({ entity, value }) => {
    const [newValue] = value;
    const type = newValue?.value;
    if (type == null || type == ItemTypes.LuckGem) return;

    let name = "Unknown";
    if (ItemTypeNames[type]) name = ItemTypeNames[type];

    setComponent(Name, entity, { value: name });
  });

  defineComponentSystem(world, LuckGem, ({ entity, value }) => {
    const roll = value[0];
    if (roll == null) return;

    const name = `${ItemTypeNames[ItemTypes.LuckGem]}: ${roll.value}`;
    setComponent(Name, entity, { value: name });
  });
}

import { PhaserLayer } from "../../types";
import { pixelToWorldCoord } from "../../utils";
import { map } from "rxjs";
import {
  EntityIndex,
  getComponentValue,
  getComponentValueStrict,
  Has,
  hasComponent,
  HasValue,
  Not,
  runQuery,
  setComponent,
  removeComponent,
  EntityID,
} from "@latticexyz/recs";
import { WorldCoord } from "../../../../../types";
import { getPlayerEntity, isOwnedByCaller } from "@latticexyz/std-client";

export function createInputSystem(layer: PhaserLayer) {
  const {
    scenes: {
      Main: { input, maps },
    },
    components: { HoverHighlight, HoverIcon },
    api: { highlightCoord },
    parentLayers: {
      network: {
        world,
        components: { Factory, TerrainType, OwnedBy, Inventory, Health, ResourceGenerator, EscapePortal, Player },
        api: {
          buildAt,
          dropInventory,
          gatherResource,
          transferInventory,
          escapePortal,
          dev: { spawnGold },
        },
        utils: { getItems },
        network: { connectedAddress },
      },
      headless: {
        api: {
          moveEntity,
          attackEntity,
          canGatherResource,
          canTakeInventory,
          canGiveInventory,
          canAttack,
          canEscapePortal,
        },
      },
      local: {
        singletonEntity,
        components: { Selected, LocalPosition, PotentialPath },
      },
    },
  } = layer;

  const getSelectedEntity = () => [...runQuery([Has(Selected)])][0];
  const getHighlightedEntity = () => {
    const hoverHighlight = getComponentValueStrict(HoverHighlight, singletonEntity);
    const highlightedEntity = [
      ...runQuery([HasValue(LocalPosition, { x: hoverHighlight.x, y: hoverHighlight.y }), Not(TerrainType)]),
    ][0];

    return highlightedEntity;
  };
  const getHoverPosition = () => {
    const hoverHighlight = getComponentValue(HoverHighlight, singletonEntity);
    if (!hoverHighlight) return;
    if (!hoverHighlight.x || !hoverHighlight.y) return;

    return {
      x: hoverHighlight.x,
      y: hoverHighlight.y,
    };
  };

  const attemptGatherResource = function (selectedEntity: EntityIndex, highlightedEntity: EntityIndex) {
    if (!canGatherResource(highlightedEntity, selectedEntity)) return false;
    gatherResource(world.entities[highlightedEntity], world.entities[selectedEntity]);
    return true;
  };

  const attemptTakeInventory = function (selectedEntity: EntityIndex, highlightedEntity: EntityIndex) {
    if (!canTakeInventory(highlightedEntity, selectedEntity)) return false;
    transferInventory(world.entities[highlightedEntity], world.entities[selectedEntity]);
    return true;
  };

  const attemptGiveInventory = function (selectedEntity: EntityIndex, highlightedEntity: EntityIndex) {
    if (!canGiveInventory(selectedEntity, highlightedEntity)) return false;
    transferInventory(world.entities[selectedEntity], world.entities[highlightedEntity]);
    return true;
  };

  const attemptAttack = function (selectedEntity: EntityIndex, highlightedEntity: EntityIndex) {
    if (!canAttack(selectedEntity, highlightedEntity)) return false;
    attackEntity(selectedEntity, highlightedEntity);
    return true;
  };

  const attemptEscapePortal = function (selectedEntity: EntityIndex, highlightedEntity: EntityIndex) {
    if (!canEscapePortal(selectedEntity, highlightedEntity)) return false;
    escapePortal(world.entities[selectedEntity], world.entities[highlightedEntity]);
    return true;
  };

  const onRightClick = function (clickedPosition: WorldCoord) {
    const playerEntity = getPlayerEntity(connectedAddress.get(), world, Player);
    if (!playerEntity) return;

    const selectedEntity = getSelectedEntity();
    if (selectedEntity == null) return;
    if (!isOwnedByCaller(OwnedBy, selectedEntity, playerEntity, world.entityToIndex)) return;

    const highlightedEntity = getHighlightedEntity();

    if (highlightedEntity != null) {
      if (attemptEscapePortal(selectedEntity, highlightedEntity)) return;
      if (attemptGatherResource(selectedEntity, highlightedEntity)) return;
      if (attemptTakeInventory(selectedEntity, highlightedEntity)) return;
      if (attemptAttack(selectedEntity, highlightedEntity)) return;

      if (isOwnedByCaller(OwnedBy, highlightedEntity, playerEntity, world.entityToIndex)) {
        if (attemptGiveInventory(selectedEntity, highlightedEntity)) return;
      }
    }

    moveEntity(selectedEntity, clickedPosition);
  };

  const hoverUI = function (hoveredPosition: WorldCoord) {
    const previousHoveredPosition = getComponentValue(HoverHighlight, singletonEntity);
    if (
      previousHoveredPosition &&
      hoveredPosition.x === previousHoveredPosition.x &&
      hoveredPosition.y === previousHoveredPosition.y
    ) {
      return;
    }

    highlightCoord(hoveredPosition);
    const selectedEntity = getSelectedEntity();
    if (!selectedEntity) {
      setComponent(HoverIcon, singletonEntity, { icon: "default" });
      return;
    }

    const hoverHighlight = getComponentValueStrict(HoverHighlight, singletonEntity);
    const highlightedEntity = [
      ...runQuery([HasValue(LocalPosition, { x: hoverHighlight.x, y: hoverHighlight.y }), Not(TerrainType)]),
    ][0];
    if (selectedEntity == highlightedEntity) return;

    const playerEntity = world.entityToIndex.get(connectedAddress.get() as EntityID);

    if (!playerEntity) return;
    if (!hasComponent(Player, playerEntity) || hasComponent(Death, playerEntity)) return;
    if (!isOwnedByCaller(OwnedBy, selectedEntity, playerEntity, world.entityToIndex)) return;

    if (highlightedEntity != null) {
      if (canEscapePortal(selectedEntity, highlightedEntity)) {
        setComponent(HoverIcon, singletonEntity, { icon: "url(assets/move.png), pointer" });
        return;
      } else if (canGatherResource(highlightedEntity, selectedEntity)) {
        setComponent(HoverIcon, singletonEntity, { icon: "url(assets/pickup.png), pointer" });
        return;
      } else if (canTakeInventory(highlightedEntity, selectedEntity)) {
        setComponent(HoverIcon, singletonEntity, { icon: "url(assets/pickup.png), pointer" });
        return;
      } else if (canAttack(selectedEntity, highlightedEntity)) {
        setComponent(HoverIcon, singletonEntity, { icon: "url(assets/attack.png), pointer" });
        return;
      }

      if (isOwnedByCaller(OwnedBy, highlightedEntity, playerEntity, world.entityToIndex)) {
        if (canGiveInventory(selectedEntity, highlightedEntity)) {
          setComponent(HoverIcon, singletonEntity, { icon: "url(assets/transfer.png), pointer" });
          return;
        }
      }
    }

    const paths = getComponentValue(PotentialPath, selectedEntity);
    if (!paths || paths.x.length === 0) {
      setComponent(HoverIcon, singletonEntity, { icon: "pointer" });
      return;
    }

    let coordInPath = false;
    for (let i = 0; i < paths.x.length; i++) {
      if (paths.x[i] == hoveredPosition.x && paths.y[i] == hoveredPosition.y) {
        coordInPath = true;
        break;
      }
    }

    if (!coordInPath) {
      setComponent(HoverIcon, singletonEntity, { icon: "pointer" });
      return;
    }

    setComponent(HoverIcon, singletonEntity, { icon: "url(assets/move.png), pointer" });
  };

  input.onKeyPress(
    (keys) => keys.has("B"),
    () => {
      const buildPosition = getHoverPosition();
      if (!buildPosition) return;

      const selectedEntity = getSelectedEntity();
      if (!selectedEntity) return;

      const factory = getComponentValue(Factory, selectedEntity);
      if (!factory) return;
      const prototypeId = factory.prototypeIds[0];
      if (!prototypeId) return;

      buildAt(world.entities[selectedEntity], prototypeId, buildPosition);
    }
  );

  input.onKeyPress(
    (keys) => keys.has("A"),
    () => {
      const selectedEntity = getSelectedEntity();
      if (!selectedEntity) return;

      const highlightedEntity = getHighlightedEntity();
      if (!highlightedEntity) return;

      attackEntity(selectedEntity, highlightedEntity);
    }
  );

  input.onKeyPress(
    (keys) => keys.has("G"),
    () => {
      const position = getHoverPosition();
      if (!position) return;

      spawnGold(position);
    }
  );

  input.onKeyPress(
    (keys) => keys.has("D"),
    () => {
      const selectedEntity = getSelectedEntity();
      if (!selectedEntity) return;

      const hoverPosition = getHoverPosition();
      if (!hoverPosition) return;

      const hasInventory = getComponentValue(Inventory, selectedEntity);
      if (!hasInventory) return;

      dropInventory(world.entities[selectedEntity], hoverPosition);
    }
  );

  input.pointermove$
    .pipe(
      map((pointer) => ({ x: pointer.worldX, y: pointer.worldY })), // Map pointer to pointer pixel cood
      map((pixel) => pixelToWorldCoord(maps.Main, pixel)) // Map pixel coord to tile coord
    )
    .subscribe((coord) => {
      hoverUI(coord);
    });

  input.rightClick$
    .pipe(
      map((pointer) => ({ x: pointer.worldX, y: pointer.worldY })),
      map((pixel) => pixelToWorldCoord(maps.Main, pixel))
    )
    .subscribe((coord) => {
      onRightClick(coord);
    });
}

import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { Has, getComponentValueStrict, defineComponentSystem, UpdateType } from "@latticexyz/recs";
import { PhaserLayer } from "../../types";
let counter = 1;
export function createDrawHoverIconSystem(layer: PhaserLayer) {
  const {
    world,
    components: { HoverIcon },
    scenes: {
      Main: { input },
    },
  } = layer;

  defineComponentSystem(world, HoverIcon, ({ value }) => {
    const cursorIcon = value[0];
    console.log(`set cursor icon ${counter++} times`);
    if (!cursorIcon) {
      input.setCursor("pointer");
    } else {
      input.setCursor(cursorIcon.icon);
    }
  });
}

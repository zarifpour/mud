import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import {
  Has,
  getComponentValueStrict,
  defineSystem,
  UpdateType,
  Component,
  Type,
  World,
  runQuery,
} from "@latticexyz/recs";
import { GodID } from "@latticexyz/std-client";
import { keccak256 } from "@latticexyz/utils";
import { PhaserLayer } from "../../types";
import { defaultAbiCoder as abi } from "ethers/lib/utils";
import { BigNumber } from "ethers";

export function getTurnLuck(
  world: World,
  turnLuckComponent: Component<{ currentTurn: Type.Number; luckHash: Type.String }>
) {
  const godEntityIndex = world.entityToIndex.get(GodID);
  if (!godEntityIndex) return null;

  return getComponentValueStrict(turnLuckComponent, godEntityIndex);
}

export function createDrawLuckSystem(layer: PhaserLayer) {
  const {
    world,
    parentLayers: {
      network: {
        network: { providers },
        components: { Commit, UnitType, StructureType },
      },
      local: {
        components: { LocalPosition },
      },
    },
    scenes: {
      Main: {
        objectPool,
        maps: {
          Main: { tileWidth, tileHeight },
        },
      },
    },
  } = layer;

  // defineSystem(world, [Has(Commit)], ({ entity, type, value }) => {
  //   if( !value[0] || !value[0].value ) return;

  //   const commitBlock = value[0].value as number;
  //   const currProviders = providers.get();
  //   const provider = currProviders?.ws || currProviders?.json;
  //   if(provider.blockNumber - commitBlock > 255 ) return;
  //   const block = provider.getBlock(commitBlock);
  //   if (type === UpdateType.Exit) {
  //     // objectPool.remove(`${entity}-luck`);
  //   } else if ([UpdateType.Enter, UpdateType.Update].includes(type)) {
  //     const units = [...runQuery([Has(StructureType), Has(LocalPosition)])];

  //     for( const unit of units ){
  //       const position = getComponentValueStrict(LocalPosition, unit);
  //       const highlight = objectPool.get(`${unit}-luck`, "Text");

  //       console.log(block);
  //       // const strHash = block;
  //       // const strEnt = world.entities[unit];
  //       // const strEncoded = abi.encode(["uint256", "uint256"], [strHash, strEnt]);
  //       // const luck = BigNumber.from( keccak256(strEncoded)).mod(100).toNumber() + 1; //turnLuck.luckHash, entity))) % 100 + 1
  //       // highlight.setComponent({
  //       //   id: "luck-text",
  //       //   once: (staminaText) => {
  //       //     const pixelCoord = tileCoordToPixelCoord(position, tileWidth, tileHeight);

  //       //     staminaText.setFontSize(8);
  //       //     staminaText.setText(`${luck}`);
  //       //     staminaText.setPosition(pixelCoord.x - 10, pixelCoord.y + tileHeight - 10);
  //       //   },
  //       // });
  //     }
  //   }
  // });
}

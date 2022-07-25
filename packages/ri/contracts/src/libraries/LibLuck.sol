// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import { IWorld } from "solecs/interfaces/IWorld.sol";
import { IUint256Component } from "solecs/interfaces/IUint256Component.sol";
import { getAddressById } from "solecs/utils.sol";
import { QueryFragment, QueryType } from "solecs/interfaces/Query.sol";
import { console } from "forge-std/console.sol";
import { LibStamina } from "../libraries/LibStamina.sol";

import { LibQuery } from "solecs/LibQuery.sol";

import { GameConfigComponent, ID as GameConfigComponentID, GameConfig, GodID } from "../components/GameConfigComponent.sol";
import { TurnLuckComponent, ID as TurnLuckComponentID, TurnLuck } from "../components/TurnLuckComponent.sol";
import { LuckGemComponent, ID as LuckGemComponentID } from "../components/LuckGemComponent.sol";
import { CommitComponent, ID as CommitComponentID } from "../components/CommitComponent.sol";
import { OwnedByComponent, ID as OwnedByComponentID } from "../components/OwnedByComponent.sol";
import { ItemTypeComponent, ID as ItemTypeComponentID } from "../components/ItemTypeComponent.sol";

import { ItemTypes } from "../utils/Types.sol";

library LibLuck {
  function getTurnLuck(IUint256Component components) internal returns (uint256) {
    TurnLuckComponent turnLuckComponent = TurnLuckComponent(getAddressById(components, TurnLuckComponentID));
    int32 currentTurn = LibStamina.getCurrentTurn(components);
    console.log("current turn", uint256(uint32(currentTurn)));
    if (turnLuckComponent.has(GodID)) {
      TurnLuck memory turnLuck = turnLuckComponent.getValue(GodID);
      if (turnLuck.currentTurn == currentTurn) {
        console.log("turn luck hash", turnLuck.luckHash);
        return turnLuck.luckHash;
      }
    }
    uint256 luckHash = uint256(blockhash(block.number - 1));
    console.log("turn luck hash", luckHash);
    turnLuckComponent.set(GodID, TurnLuck({ currentTurn: currentTurn, luckHash: luckHash }));
    return luckHash;
  }

  function generateLuckGemValue(
    IUint256Component components,
    IWorld world,
    uint256 shrineEntity,
    uint256 luckGemEntity
  ) internal {
    if (block.number > 2**32 - 1) return;

    CommitComponent commitComponent = CommitComponent(getAddressById(components, CommitComponentID));
    console.log("commitComponent");

    if (!commitComponent.has(shrineEntity)) {
      commitComponent.set(shrineEntity, uint32(block.number));
      return;
    }

    uint32 commit = commitComponent.getValue(shrineEntity);
    console.log("commit value", commit);

    if (commit != 0 || uint32(block.number) - commit > 255) {
      uint256 rollhash1 = uint256(blockhash(commit));
      uint256 rollhash2 = uint256(keccak256(abi.encode(rollhash1)));
      uint256 rollhash3 = uint256(keccak256(abi.encode(rollhash2)));
      uint32 roll = uint32((rollhash1 % 5) + (rollhash2 % 5) + (rollhash3 % 5) + 3);
      console.log("roll value", roll);

      LuckGemComponent(getAddressById(components, LuckGemComponentID)).set(luckGemEntity, roll);
      console.log("set roll component", roll);
    } else {
      LuckGemComponent(getAddressById(components, LuckGemComponentID)).set(luckGemEntity, 3);
    }

    commitComponent.set(shrineEntity, uint32(block.number));
    console.log("set commit component", uint32(block.number));
  }
}
// function getTurnBlock(IUint256Component components) internal returns (uint256) {
//   GameConfig memory gameConfig = GameConfigComponent(getAddressById(components, GameConfigComponentID)).getValue(
//     GodID
//   );

//   // console.log("block number", block.number);
//   // console.log("game start block", gameConfig.startBlock);
//   // uint256 blocksSinceGameStart = block.number - gameConfig.startBlock;
//   // console.log("blocks since game start", blocksSinceGameStart);
//   // uint256 currentBlock = blocksSinceGameStart / gameConfig.turnLength;
//   // console.log("current block turn", currentBlock);
//   // console.log("blocks since turn started", blocksSinceGameStart - currentBlock * gameConfig.turnLength);
//   // uint256 secblock = blocksSinceGameStart - currentBlock * gameConfig.turnLength;
//   // uint256 turnBlock = block.number - secblock;
//   // console.log("turn block", turnBlock);

//   // console.log("block timestamp", block.timestamp);
//   // console.log("game starttime", gameConfig.startTime);
//   // uint256 secondsSinceGameStart = block.timestamp - gameConfig.startTime;
//   // console.log("seconds since game start", secondsSinceGameStart);
//   // uint256 currentTurn = secondsSinceGameStart / gameConfig.turnLength;
//   // console.log("current time turn", currentTurn);
//   // console.log("seconds since turn started", secondsSinceGameStart - currentTurn * gameConfig.turnLength);
//   // uint256 sec = secondsSinceGameStart - currentTurn * gameConfig.turnLength;
//   // uint256 turntime = block.number - sec;
//   // console.log("turn time", turntime);
//   return turnBlock;
// }
// }

// console.log("block timestamp", block.timestamp);
// console.log("game starttime", gameConfig.startBlock);
// uint256 secondsSinceGameStart = block.timestamp - gameConfig.startTime;
// console.log("seconds since game start", secondsSinceGameStart);
// uint256 currentTurn = secondsSinceGameStart / gameConfig.turnLength;
// console.log("current turn", currentTurn);
// console.log("seconds since turn started", secondsSinceGameStart - currentTurn * gameConfig.turnLength);
// uint256 sec = secondsSinceGameStart - currentTurn * gameConfig.turnLength;
// uint256 turnBlock = block.number - sec;
// console.log("turn block", turnBlock);
// return turnBlock;

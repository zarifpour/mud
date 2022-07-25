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
    uint32 roll = 5;

    if (commit != 0 || uint32(block.number) - commit > 255) {
      roll = (uint32(uint256(blockhash(commit))) % 20) + 1;
    }

    LuckGemComponent(getAddressById(components, LuckGemComponentID)).set(luckGemEntity, roll);
    console.log("set roll value", roll);

    commitComponent.set(shrineEntity, uint32(block.number));
    console.log("set commit component", uint32(block.number));
  }
}

// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import { console } from "forge-std/console.sol";
import { IUint256Component } from "solecs/interfaces/IUint256Component.sol";
import { IWorld } from "solecs/interfaces/IWorld.sol";
import { getAddressById } from "solecs/utils.sol";

import { GameConfigComponent, ID as GameConfigComponentID, GameConfig, GodID } from "../components/GameConfigComponent.sol";
import { SummonComponent, ID as SummonComponentID, Summon } from "../components/SummonComponent.sol";
import { PrototypeCopyComponent, ID as PrototypeCopyComponentID } from "../components/PrototypeCopyComponent.sol";
import { CombatComponent, ID as CombatComponentID } from "../components/CombatComponent.sol";

library LibMerge {
  function summonUnit(
    IUint256Component components,
    IWorld world,
    uint256 summonerId,
    uint256[] memory sacrificedEntities
  ) internal returns (uint256 summonedEntity) {
    require(
      summon.sacrificedPrototypeIds.length == sacrificedEntities.length,
      "incorrect amount of sacrificed entities"
    );
    Summon memory summon = SummonComponent(getAddressById(components, SummonComponentID)).getValue(summonerId);
    PrototypeCopyComponent prototypeCopyComponent = PrototypeCopyComponent(
      getAddressById(components, PrototypeCopyComponentID)
    );
    CombatComponent combatComponent = CombatComponent(getAddressById(components, CombatComponentID));

    int32 healthPercentageTotal = 0;

    for (uint256 i = 0; i < summon.sacrificedPrototypeIds.length; i++) {
      console.log("sac ent Pid", i, prototypeCopyComponent.getValue(sacrificedEntities[i]));
      console.log("sum sac Pid", i, summon.sacrificedPrototypeIds[i]);
      require(
        summon.sacrificedPrototypeIds[i] == prototypeCopyComponent.getValue(sacrificedEntities[i]),
        "summon not provided with correct sacrificed entities"
      );

      healthPercentageTotal += combatComponent.getValue(sacrificedEntities[i]).health / 100_000;
    }

    healthPercentageTotal /= sacrificedEntities.length;
  }
}

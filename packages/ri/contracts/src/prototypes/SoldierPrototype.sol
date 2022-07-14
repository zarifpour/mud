// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import { IUint256Component } from "solecs/interfaces/IUint256Component.sol";
import { IWorld } from "solecs/interfaces/IWorld.sol";
import { getAddressById } from "solecs/utils.sol";

import { LibPrototype } from "../libraries/LibPrototype.sol";

import { PrototypeComponent, ID as PrototypeComponentID } from "../components/PrototypeComponent.sol";
import { UnitTypeComponent, ID as UnitTypeComponentID } from "../components/UnitTypeComponent.sol";
import { CombatTypeComponent, ID as CombatTypeComponentID } from "../components/CombatTypeComponent.sol";
import { MovableComponent, ID as MovableComponentID } from "../components/MovableComponent.sol";
import { StaminaComponent, Stamina, ID as StaminaComponentID } from "../components/StaminaComponent.sol";
import { HealthComponent, Health, ID as HealthComponentID } from "../components/HealthComponent.sol";
import { AttackComponent, Attack, ID as AttackComponentID } from "../components/AttackComponent.sol";
import { UntraversableComponent, ID as UntraversableComponentID } from "../components/UntraversableComponent.sol";

import { ID as InventoryID } from "./InventoryPrototype.sol";

uint256 constant ID = uint256(keccak256("ember.prototype.soldier"));

function SoldierPrototype(IUint256Component components, IWorld world) {
  UnitTypeComponent(getAddressById(components, UnitTypeComponentID)).set(ID, uint32(0));
  CombatTypeComponent(getAddressById(components, CombatTypeComponentID)).set(ID, uint32(0));
  StaminaComponent(getAddressById(components, StaminaComponentID)).set(
    ID,
    Stamina({ current: 0, max: 3, regeneration: 1 })
  );
  HealthComponent(getAddressById(components, HealthComponentID)).set(ID, Health({ current: 100_000, max: 100_000 }));
  AttackComponent(getAddressById(components, AttackComponentID)).set(ID, Attack({ strength: 60_000, range: 1 }));
  MovableComponent(getAddressById(components, MovableComponentID)).set(ID, int32(3));
  UntraversableComponent(getAddressById(components, UntraversableComponentID)).set(ID);

  uint256[] memory componentIds = new uint256[](7);
  componentIds[0] = UnitTypeComponentID;
  componentIds[1] = CombatTypeComponentID;
  componentIds[2] = StaminaComponentID;
  componentIds[3] = MovableComponentID;
  componentIds[4] = HealthComponentID;
  componentIds[5] = AttackComponentID;
  componentIds[6] = UntraversableComponentID;

  PrototypeComponent(getAddressById(components, PrototypeComponentID)).set(ID, componentIds);

  LibPrototype.createPrototypeFromPrototype(components, world, InventoryID, ID);
}

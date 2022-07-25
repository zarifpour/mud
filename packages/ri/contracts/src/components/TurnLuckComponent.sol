// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;
import "solecs/Component.sol";
import { console } from "forge-std/console.sol";

struct TurnLuck {
  int32 currentTurn;
  uint256 luckHash;
}

uint256 constant ID = uint256(keccak256("mudwar.component.TurnLuck"));

contract TurnLuckComponent is Component {
  constructor(address world) Component(world, ID) {}

  function getSchema() public pure override returns (string[] memory keys, LibTypes.SchemaValue[] memory values) {
    keys = new string[](2);
    values = new LibTypes.SchemaValue[](2);

    keys[0] = "currentTurn";
    values[0] = LibTypes.SchemaValue.INT32;

    keys[1] = "luckHash";
    values[1] = LibTypes.SchemaValue.UINT256;
  }

  function set(uint256 entity, TurnLuck calldata value) public {
    set(entity, abi.encode(value));
  }

  function getValue(uint256 entity) public view returns (TurnLuck memory) {
    console.log("get value");
    (int32 currentTurn, uint256 luckHash) = abi.decode(getRawValue(entity), (int32, uint256));
    console.log("decoded");
    return TurnLuck(currentTurn, luckHash);
  }

  function getEntitiesWithValue(TurnLuck calldata turnLuck) public view returns (uint256[] memory) {
    return getEntitiesWithValue(abi.encode(turnLuck));
  }
}

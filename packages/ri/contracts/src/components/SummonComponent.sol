// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;
import "solecs/Component.sol";

struct Summon {
  uint256[] sacrificedPrototypeIds;
  uint256 summonedPrototypeId;
}

uint256 constant ID = uint256(keccak256("mudwar.component.Summon"));

contract SummonComponent is Component {
  constructor(address world) Component(world, ID) {}

  function getSchema() public pure override returns (string[] memory keys, LibTypes.SchemaValue[] memory values) {
    keys = new string[](2);
    values = new LibTypes.SchemaValue[](2);

    keys[0] = "sacrificedPrototypeIds";
    values[0] = LibTypes.SchemaValue.UINT256_ARRAY;

    keys[1] = "summonedPrototypeId";
    values[1] = LibTypes.SchemaValue.UINT256;
  }

  function set(uint256 entity, Summon calldata value) public {
    set(entity, encodedValue(value));
  }

  function getValue(uint256 entity) public view returns (Summon memory) {
    (uint256[] memory sacrificedPrototypeIds, uint256 summonedPrototypeId) = abi.decode(
      getRawValue(entity),
      (uint256[], uint256)
    );
    return Summon(sacrificedPrototypeIds, summonedPrototypeId);
  }

  function getEntitiesWithValue(Summon calldata summon) public view returns (uint256[] memory) {
    return getEntitiesWithValue(encodedValue(summon));
  }

  function encodedValue(Summon calldata summon) private pure returns (bytes memory) {
    return abi.encode(summon.sacrificedPrototypeIds, summon.summonedPrototypeId);
  }
}

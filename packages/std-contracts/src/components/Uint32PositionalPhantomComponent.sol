// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;
import "solecs/PositionalPhantomComponent.sol";

contract Uint32PositionalPhantomComponent is PositionalPhantomComponent {
  constructor(
    address world,
    uint256 id,
    uint256 prefix
  ) PositionalPhantomComponent(world, id, prefix) {}

  function getSchema() public pure override returns (string[] memory keys, LibTypes.SchemaValue[] memory values) {
    keys = new string[](1);
    values = new LibTypes.SchemaValue[](1);

    keys[0] = "value";
    values[0] = LibTypes.SchemaValue.UINT32;
  }

  function getRawValue(uint256 entity) public view override returns (bytes memory) {
    return abi.encode(getValue(entity));
  }

  function getValue(uint256 entity) public view returns (uint32) {
    return getValue(getPositionFromEntity(entity));
  }

  function getValue(Vector2D128 memory position) public view virtual returns (uint32) {
    return 0;
  }

  function getEntitiesWithValue(uint32 value) public view returns (uint256[] memory) {
    return getEntitiesWithValue(abi.encode(value));
  }
}

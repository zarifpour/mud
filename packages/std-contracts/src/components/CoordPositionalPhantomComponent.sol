// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;
import "solecs/PositionalPhantomComponent.sol";

struct Coord {
  int32 x;
  int32 y;
}

contract CoordPositionalPhantomComponent is PositionalPhantomComponent {
  constructor(
    address world,
    uint256 id,
    uint256 prefix
  ) PositionalPhantomComponent(world, id, prefix) {}

  function getSchema() public pure override returns (string[] memory keys, LibTypes.SchemaValue[] memory values) {
    keys = new string[](2);
    values = new LibTypes.SchemaValue[](2);

    keys[0] = "x";
    values[0] = LibTypes.SchemaValue.INT32;

    keys[1] = "y";
    values[1] = LibTypes.SchemaValue.INT32;
  }

  function set(uint256 entity, Coord calldata value) public {
    set(entity, abi.encode(value));
  }

  function getRawValue(uint256 entity) public view override returns (bytes memory) {
    return abi.encode(getValue(entity));
  }

  function getValue(uint256 entity) public view returns (Coord memory) {
    return getValue(getPositionFromEntity(entity));
  }

  function getValue(Vector2D128 memory position) public view virtual returns (Coord memory) {
    return Coord(int32(position.x), int32(position.y));
  }

  function getEntitiesWithValue(Coord calldata coord) public view returns (uint256[] memory) {
    return getEntitiesWithValue(abi.encode(coord));
  }
}

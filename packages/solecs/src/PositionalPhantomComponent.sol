// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;
import "./PhantomComponent.sol";

struct Vector2D128 {
  int128 x;
  int128 y;
}

abstract contract PositionalPhantomComponent is PhantomComponent {
  constructor(
    address world,
    uint256 id,
    uint256 prefix
  ) PhantomComponent(world, id, prefix) {}

  function getPositionFromEntity(uint256 entity) public view returns (Vector2D128 memory) {
    uint256 noPrefixEntity = entity - (prefix << 248);
    uint256 x = noPrefixEntity >> 124;
    uint256 y = noPrefixEntity - (x << 124);
    return Vector2D128(int128(uint128(x)), int128(uint128(y)));
  }

  function getEntityFromPosition(Vector2D128 memory position) public view returns (uint256) {
    return (prefix << 248) + (uint256(int256(position.x)) << 124) + uint256(int256(position.y));
  }

  function emitValue(Vector2D128 memory position) public {
    emitValue(getEntityFromPosition(position));
  }

  function posEmitValue(Vector2D128 memory origin, Vector2D128 memory delta) public {
    // TODO: optimize gas usage
    for (int128 x = origin.x; x < origin.x + delta.x; x++) {
      for (int128 y = origin.y; y < origin.y + delta.y; y++) {
        emitValue(Vector2D128(int128(x), int128(y)));
      }
    }
  }
}

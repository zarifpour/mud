// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;
import "std-contracts/components/Uint32PositionalPhantomComponent.sol";
import { PerlinNoise } from "./lib/PerlinNoise.sol";

// uint256 constant ID = uint256(keccak256("ember.component.terrainTypeComponent"));
uint256 constant ID = uint256(keccak256("ember.component.entityTypeComponent"));
uint256 constant prefix = 1 << 248;

contract EntityTypeComponent is Uint32PositionalPhantomComponent {
  constructor(address world) Uint32PositionalPhantomComponent(world, ID, prefix) {
    posEmitValue(Vector2D128(0, 0), Vector2D128(5, 5));
  }

  function getValue(Vector2D128 memory position) public view override returns (uint32) {
    int256 perlinValue = PerlinNoise.noise2d(int256(position.x) * 4096, int256(position.y) * 4096);
    if (perlinValue < -10000) {
      return 3; // river
    } else if (perlinValue < 20000) {
      return 1; // grass
    } else {
      return 2; // mountain
    }
  }
}

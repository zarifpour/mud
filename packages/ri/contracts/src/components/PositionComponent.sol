// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;
import "std-contracts/components/CoordPositionalPhantomComponent.sol";

// uint256 constant ID = uint256(keccak256("ember.component.terrainTypeComponent"));
uint256 constant ID = uint256(keccak256("ember.component.positionComponent"));
uint256 constant prefix = 1 << 248;

contract PositionComponent is CoordPositionalPhantomComponent {
  constructor(address world) CoordPositionalPhantomComponent(world, ID, prefix) {
    posEmitValue(Vector2D128(0, 0), Vector2D128(5, 5));
  }
}

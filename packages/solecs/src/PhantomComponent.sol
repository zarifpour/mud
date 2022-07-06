// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import "./Component.sol";

abstract contract PhantomComponent is IComponent {
  address public world;
  address public owner;

  uint256 public id;
  uint256 public prefix;

  constructor(
    address _world,
    uint256 _id,
    uint256 _prefix
  ) {
    world = _world;
    IWorld(_world).registerComponent(address(this), _id);
    owner = msg.sender;
    id = _id;
    prefix = _prefix;
  }

  modifier onlyContractOwner() {
    require(msg.sender == owner, "ONLY_CONTRACT_OWNER");
    _;
  }

  function transferOwnership(address newOwner) public onlyContractOwner {
    owner = newOwner;
  }

  function getSchema() public pure virtual returns (string[] memory keys, LibTypes.SchemaValue[] memory values);

  function set(uint256 entity, bytes memory value) public onlyContractOwner {}

  function remove(uint256 entity) public onlyContractOwner {}

  function registerIndexer(address indexer) external onlyContractOwner {}

  function getEntities() public view returns (uint256[] memory) {
    uint256[] memory emptyArray;
    return emptyArray;
  }

  function getEntitiesWithValue(bytes memory value) public view returns (uint256[] memory) {
    uint256[] memory emptyArray;
    return emptyArray;
  }

  function has(uint256 entity) public view returns (bool) {
    return entity >> 248 == prefix;
  }

  function getRawValue(uint256 entity) public view virtual returns (bytes memory);

  function emitValue(uint256 entity) public {
    bytes memory value = getRawValue(entity);
    IWorld(world).emitComponentValueSet(address(this), entity, value);
  }
}

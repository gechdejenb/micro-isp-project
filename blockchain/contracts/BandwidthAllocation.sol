pragma solidity ^0.8.0;

contract BandwidthAllocation {
    mapping(address => uint256) public bandwidth;

    event BandwidthAllocated(address user, uint256 amount);

    function allocateBandwidth(address user, uint256 amount) public {
        bandwidth[user] += amount;
        emit BandwidthAllocated(user, amount);
    }
}
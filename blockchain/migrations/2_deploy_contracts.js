const BandwidthAllocation = artifacts.require("BandwidthAllocation");

module.exports = function (deployer) {
    deployer.deploy(BandwidthAllocation);
};
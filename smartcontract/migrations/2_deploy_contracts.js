var Glint = artifacts.require("./glint.sol");

module.exports = function(deployer) {
  deployer.deploy(Glint, "Deploying Glint..");
};

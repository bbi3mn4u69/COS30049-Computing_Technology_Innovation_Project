const Main = artifacts.require("main_contract");

module.exports = function(deployer) {
  deployer.deploy(Main);
};


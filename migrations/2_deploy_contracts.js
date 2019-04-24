var Superheroes = artifacts.require("./Superheroes.sol");

module.exports = function(deployer) {
  deployer.deploy(Superheroes);
};

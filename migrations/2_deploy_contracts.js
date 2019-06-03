var Superheroes = artifacts.require("./Superheroes.sol");

module.exports = function(deployer) {
  deployer.deploy(Superheroes).then((data) => {
    console.log('Success');
    console.log(data);
  }).catch((err) => {
    console.log(err);
  });
};

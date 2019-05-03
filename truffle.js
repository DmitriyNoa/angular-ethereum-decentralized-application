const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
    networks: {
         development: {
              host: "localhost",
              port: 7545,
              network_id: "*" // Match any network id
            },
      ropsten: {
        provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY),
        network_id: 3,
        gas: 3000000,
        gasPrice: 10000000000
      },
       }
};

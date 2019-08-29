declare const require;
const ABI = require('../../build_ropsten/contracts/Superheroes.json');
export const environment = {
  production: true,
  networkID: 3,
  RPCProvider: 'https://ropsten.infura.io/v3/084897e338f14cbea8e0d249105b405f',
  RPCWSSProvider: 'wss://ropsten.infura.io/ws/v3/084897e338f14cbea8e0d249105b405f',
  TronRPCProvider: 'https://api.shasta.trongrid.io/wallet/triggersmartcontract',
  TronContractAddress: '4187d45be1d6fd9525446c20caf1174c2c9023faf7',
  ABI
};

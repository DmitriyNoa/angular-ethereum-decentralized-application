declare const require;
const ABI = require('../../build_ropsten/contracts/Superheroes.json');
export const environment = {
  production: true,
  networkID: 3,
  RPCProvider: 'https://ropsten.infura.io/v3/084897e338f14cbea8e0d249105b405f',
  RPCWSSProvider: 'wss://ropsten.infura.io/ws/v3/084897e338f14cbea8e0d249105b405f',
  TronRPCProvider: 'https://api.shasta.trongrid.io/wallet/triggersmartcontract',
  TronContractAddress: '41257390a4a494c48574cfd07dcf0f06f1ac948708',
  EOSAddress: 'http://jungle2.cryptolions.io:80',
  EOSContractName: 'superheroes',
  ABI
};

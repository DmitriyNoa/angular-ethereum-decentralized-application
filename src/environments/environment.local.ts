declare const require;
const ABI = require('../../build/contracts/Superheroes.json');
export const environment = {
  local: true,
  production: false,
  networkID: 5777,
  RPCProvider: 'http://localhost:8545',
  RPCWSSProvider: 'ws://localhost:8545',
  TronRPCProvider: 'https://api.shasta.trongrid.io/wallet/triggersmartcontract',
  TronContractAddress: '41257390a4a494c48574cfd07dcf0f06f1ac948708',
  EOSAddress: 'http://jungle2.cryptolions.io:80',
  EOSContractName: 'superheroes',
  ABI
};

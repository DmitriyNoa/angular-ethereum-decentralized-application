declare const require;
const ABI = require('../../build/contracts/Superheroes.json');
export const environment = {
  local: true,
  production: false,
  networkID: 5777,
  RPCProvider: 'http://localhost:8545',
  RPCWSSProvider: 'ws://localhost:8545',
  TronRPCProvider: 'https://api.shasta.trongrid.io/wallet/triggersmartcontract',
  TronContractAddress: '4187d45be1d6fd9525446c20caf1174c2c9023faf7',
  ABI
};

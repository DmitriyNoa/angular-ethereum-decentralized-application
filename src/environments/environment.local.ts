declare const require;
const ABI = require('../../build/contracts/Superheroes.json');
export const environment = {
  local: true,
  production: false,
  networkID: 5777,
  RPCProvider: 'http://localhost:8545',
  RPCWSSProvider: 'ws://localhost:8545',
  ABI
};

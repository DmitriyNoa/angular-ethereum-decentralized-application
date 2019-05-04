declare const require;
const ABI = require('../../build/contracts/Superheroes.json');
export const environment = {
  local: true,
  RPCProvider: 'http://localhost:7545',
  ABI
};

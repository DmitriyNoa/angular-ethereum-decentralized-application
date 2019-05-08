declare const require;
const ABI = require('../../build/contracts/Superheroes.json');
export const environment = {
  localRemoteProvider: true,
  production: false,
  RPCProvider: 'https://ropsten.infura.io/v3/084897e338f14cbea8e0d249105b405f',
  RPCWSSProvider: 'wss://ropsten.infura.io/ws/v3/084897e338f14cbea8e0d249105b405f',
  ABI
};

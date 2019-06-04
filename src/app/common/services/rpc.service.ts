import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RPCService {

  constructor() { }

  rpc(methodName: string, parameterValue: string): Observable<any> | Promise<any> | any {
    const ABI = environment.ABI;
    const web3 = new Web3();
    const functionABI = ABI.abi.filter((abiItem) => {
      return abiItem.name === methodName;
    })[0];
    let contractAddress;
    for (const key in ABI.networks) {
      if (!contractAddress && ABI.networks[key]) {
        contractAddress = ABI.networks[key].address;
      }
    }

    const RPCData = functionABI.inputs.length ?  web3.eth.abi.encodeFunctionCall(functionABI, [parameterValue]) : functionABI.signature;

    return fetch(environment.RPCProvider, {
      method: 'POST', body: JSON.stringify({
        params: [{data: RPCData, to: contractAddress}, 'latest'], jsonrpc: '2.0',
        method: 'eth_call', id: 1
      })
    }).then((e) => e.json()).then((data) => {
      const result = data.result;
      const decoded = web3.eth.abi.decodeParameters(functionABI.outputs, result);
      return Promise.resolve(decoded.result || decoded[0]);
    });
  }
}

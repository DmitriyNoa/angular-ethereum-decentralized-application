import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
declare let require;
import Web3 from 'web3';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PureRpcResolverService implements Resolve<any>{

  constructor() {
    console.log(environment);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const ABI = environment.ABI;
    const functionABI = ABI.abi.filter((abiItem) => {
      return abiItem.name === route.data['abiMethodName'];
    })[0];
    let contractAddress;
    for (const key in ABI.networks) {
      if (!contractAddress && ABI.networks[key]) {
        contractAddress = ABI.networks[key].address;
      }
    }
    return fetch(environment.RPCProvider, {
      method: 'POST', body: JSON.stringify({
        params: [{data: functionABI.signature, to: contractAddress}, 'latest'], jsonrpc: '2.0',
        method: 'eth_call', id: 1
      })
    }).then((e) => e.json()).then((data) => {
      const result = data.result;
      const test = new Web3().eth.abi.decodeParameters(functionABI.outputs, result);

      return Promise.resolve(test.result);
    });
  }
}

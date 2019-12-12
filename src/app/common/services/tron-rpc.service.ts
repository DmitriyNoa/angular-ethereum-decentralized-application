import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TronRpcService {

  constructor() { }

  rpc(methodName: string, parameterValue: string): Observable<any> | Promise<any> | any {

    return fetch(environment.TronRPCProvider, {
      method: 'POST',
      body: JSON.stringify({
        contract_address: environment.TronContractAddress,
        owner_address: environment.TronContractAddress,
        function_selector: 'getSuperHeroes()',
        parameter: parameterValue || ''
      })
    }).then((result) => {
      return result.json();
    }).then((data) => {
      return Promise.resolve(data.constant_result[0]);
    });
  }
}

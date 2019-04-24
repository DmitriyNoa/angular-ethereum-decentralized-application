import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
declare var web3;

@Injectable({
  providedIn: 'root'
})
export class Web3ResolverService implements Resolve<any> {

  constructor() {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any>  {
    if (!web3) {
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      return delay;
    } else {
      return Promise.resolve();
    }
  }
}

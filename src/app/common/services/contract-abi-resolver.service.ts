import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Web3Service} from './web3.service';
import contract from 'truffle-contract';

@Injectable({
  providedIn: 'root'
})
export class ContractAbiResolverService implements Resolve<any> {

  constructor(private web3Service: Web3Service) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any>  {
    const contractABI = route.data['contractABI'];
    const contractAbstraction = contract(contractABI);
    contractAbstraction.setProvider(this.web3Service.getProvider());
    return contractAbstraction.deployed();
  }
}

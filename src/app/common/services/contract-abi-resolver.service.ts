import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import contract from 'truffle-contract';
import {Web3Service} from './web3.service';
declare let require: any;
const superheroesABI = require('../../../../build/contracts/Superheroes.json');

@Injectable({
  providedIn: 'root'
})
export class ContractAbiResolverService implements Resolve<any> {

  constructor(private web3Service: Web3Service) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any>  {
    const contractAbstraction = contract(superheroesABI);
    contractAbstraction.setProvider(this.web3Service.getProvider());
    return contractAbstraction.deployed().then((instance) => {
      return instance;
    });
  }

}

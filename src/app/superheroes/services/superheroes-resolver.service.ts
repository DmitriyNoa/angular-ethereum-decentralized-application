import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Web3Service} from '../../common/services/web3.service';
import {Observable} from 'rxjs';
import contract from 'truffle-contract';
declare let require: any;
const superheroesABI = require('../../../../build/contracts/Superheroes.json');

@Injectable({
  providedIn: 'root'
})
export class SuperheroesResolverService implements Resolve<any> {

  constructor(private web3Service: Web3Service) { }

  getContractABI(): Promise<any> {
    const contractAbstraction = contract(superheroesABI);
    contractAbstraction.setProvider(this.web3Service.getProvider());
    return contractAbstraction.deployed();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any>  {
    return this.getContractABI().then((instance) => {
      return instance.getSuperHeroes.call();
    });
  }

}


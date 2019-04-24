import {Injectable} from '@angular/core';
import {Web3Service} from '../../common/services/web3.service';

declare let require: any;
const superheroesABI = require('../../../../build/contracts/Superheroes.json');

@Injectable({
  providedIn: 'root'
})
export class SuperheroesService {
  private accounts: string[];
  private ABI: any;

  constructor(private web3Service: Web3Service) {
    this.web3Service.artifactsToContract(superheroesABI)
      .then((instance) => {
        this.ABI = instance;
      });
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
    });
  }

  public addHero({name, avatar, category, description}): Promise<any> {
    return this.ABI.addSuperhero(name, avatar, category, description, {from: this.accounts[0]});
  }

  getHeroes(): Promise<any> {
    return this.ABI.getSuperHeroes.call();
  }

  getHero(id: number): Promise<any> {
    return this.ABI.getHero.call(id);
  }

  reviewSuperHero(superheroID: number, reviewMark: number, reviewText: string) {
    return this.ABI.review(superheroID, reviewMark, reviewText, {from: this.accounts[0]});
  }

}

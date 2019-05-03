import {Injectable} from '@angular/core';
import {Web3Service} from '../../common/services/web3.service';
import superheroesABI from '../../../../build/contracts/Superheroes.json';

@Injectable({
  providedIn: 'root'
})
export class SuperheroesService {
  private ABI: any;

  constructor(private web3Service: Web3Service) {
    this.web3Service.artifactsToContract(superheroesABI)
      .then((instance) => {
        this.ABI = instance;
      });
  }

  public setContractABI(ABI: any) {
    this.ABI = ABI;
  }

  public addHero({name, avatar, category, description}): Promise<any> {
    return this.ABI.addSuperhero(name, avatar, category, description, {from: this.web3Service.getAccount()});
  }

  public subscribeToEvent(eventName: string, callback: (data: any) => any) {
    return this.ABI[eventName]()
      .on('data', callback)
      .on('error', console.error);
  }

  getHeroes(): Promise<any> {
    return this.ABI.getSuperHeroes.call();
  }

  getHero(id: number): Promise<any> {
    return this.ABI.getHero.call(id);
  }

  reviewSuperHero(superheroID: number, reviewMark: number, reviewText: string) {
    return this.ABI.review(superheroID, reviewMark, reviewText, {from: this.web3Service.getAccount()});
  }

}

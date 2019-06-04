import {Injectable} from '@angular/core';
import {Web3Service} from '../../common/services/web3.service';

@Injectable({
  providedIn: 'root'
})
export class SuperheroesService {

  constructor(private web3Service: Web3Service) {
  }

  public addHero({name, avatar, category, description}): Promise<any> {
    return this.web3Service.abi.methods.addSuperhero(name, avatar, category, description).send({from: this.web3Service.getAccount()});
  }

  public subscribeToEvent(eventName: string, callback: (data: any) => any) {
    return this.web3Service.abi.events[eventName]()
      .on('data', callback)
      .on('error', console.error);
  }

  getHeroes(): Promise<any> {
    return this.web3Service.abi.methods.getSuperHeroes().call();
  }

  getHero(id: number): Promise<any> {
    return this.web3Service.abi.methods.getHero(id).call();
  }

  reviewSuperHero(superheroID: number, reviewMark: number, reviewText: string) {
    return this.web3Service.abi.methods.review(superheroID, reviewMark, reviewText).send( {from: this.web3Service.getAccount()});
  }

}

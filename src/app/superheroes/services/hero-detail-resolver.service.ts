import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Web3Service} from '../../common/services/web3.service';
import {Superhero} from '../interfaces/Hero';

@Injectable({
  providedIn: 'root'
})
export class HeroDetailResolverService implements Resolve<any> {

  constructor(private web3Service: Web3Service) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Superhero> {
    return this.web3Service.abi.methods.getHero(route.params.id).call();
  }
}

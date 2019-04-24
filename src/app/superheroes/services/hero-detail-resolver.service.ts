import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SuperheroesService} from './superheroes.service';

@Injectable({
  providedIn: 'root'
})
export class HeroDetailResolverService implements Resolve<any> {

  constructor(private superheroesService: SuperheroesService) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.superheroesService.getHero(route.params.id);
  }
}

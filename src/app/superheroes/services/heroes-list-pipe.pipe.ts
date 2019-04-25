import {Pipe, PipeTransform} from '@angular/core';
import {Superhero} from '../interfaces/Hero';

@Pipe({name: 'universe'})
export class HeroesListPipe implements PipeTransform {
  constructor() { }

  transform(allHeroes: Superhero[], universe: string) {
    return allHeroes.filter((hero: Superhero) => {
      return hero.category.includes(universe);
    });
  }
}

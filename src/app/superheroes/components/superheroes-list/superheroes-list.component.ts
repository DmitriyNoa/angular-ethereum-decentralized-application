import {Component} from '@angular/core';
import {SuperheroesService} from '../../services/superheroes.service';
import {ActivatedRoute} from '@angular/router';
import {Superhero} from '../../interfaces/Hero';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSnackBar} from '@angular/material';
import {environment} from '../../../../environments/environment';
import Web3 from 'web3';

@Component({
  selector: 'app-superheroes-list',
  templateUrl: './superheroes-list.component.html',
  styleUrls: ['./superheroes-list.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,
        backgroundColor: 'yellow',
      })),
      state('closed', style({
        opacity: 1,
        backgroundColor: 'white'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class SuperheroesListComponent {

  public superheroes: Superhero[] = [];
  public currentUniverse = '';

  constructor(private superheroesService: SuperheroesService, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.superheroes = this.route.snapshot.data.RPCData;

    const web3 = new Web3(
      new Web3.providers.WebsocketProvider(environment.RPCWSSProvider)
    );
    const instance = new web3.eth.Contract(environment.ABI.abi, environment.ABI.networks[environment.networkID].address);
    instance.events.NewSuperhero()
      .on('data', (event) => {
        const [id, name, avatar, category, description] = event.returnValues;
        const superHero = {
          id,
          name,
          category,
          avatar,
          description,
          isOpen: true
        };

        setTimeout(() => {
          superHero.isOpen = false;
        }, 1000);
        this.superheroes.unshift(superHero);
      })
      .on('error', console.error);
  }

  setUniverse(universe: string) {
    this.currentUniverse = universe;
  }
}

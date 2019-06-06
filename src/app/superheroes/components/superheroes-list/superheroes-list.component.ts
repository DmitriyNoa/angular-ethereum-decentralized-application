import {Component} from '@angular/core';
import {SuperheroesService} from '../../services/superheroes.service';
import {ActivatedRoute} from '@angular/router';
import {Superhero} from '../../interfaces/Hero';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSnackBar} from '@angular/material';
import {environment} from '../../../../environments/environment';
import Web3 from 'web3';
import {WebSocketsService} from '../../../common/services/web-sockets.service';

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

  constructor(private superheroesService: SuperheroesService, private route: ActivatedRoute, private snackBar: MatSnackBar, private websoket: WebSocketsService) {
    this.superheroes = this.route.snapshot.data.RPCData;

    this.websoket.socketOpened.subscribe(() => {
      this.websoket.subscribe('NewSuperhero');
    });

    this.websoket.listen((data) => {
      const {id, name, avatar, category, description} = data;
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
    });
  }

  setUniverse(universe: string) {
    this.currentUniverse = universe;
  }
}

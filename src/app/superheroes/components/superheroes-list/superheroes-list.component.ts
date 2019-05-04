import {Component, OnInit} from '@angular/core';
import {SuperheroesService} from '../../services/superheroes.service';
import {ActivatedRoute} from '@angular/router';
import {Superhero} from '../../interfaces/Hero';
import {animate, state, style, transition, trigger} from '@angular/animations';
import Web3 from 'web3';
import { ethers } from 'ethers';
import abiDecoder from 'abi-decoder';

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
export class SuperheroesListComponent implements OnInit {

  public superheroes: Superhero[] = [];
  public currentUniverse = '';

  constructor(private superheroesService: SuperheroesService, private route: ActivatedRoute) {
    this.superheroes = this.route.snapshot.data.RPCData;
    // this.superheroesService.setContractABI(this.route.snapshot.data.abi);
  }

  setUniverse(universe: string) {
    this.currentUniverse = universe;
  }

  ngOnInit() {
    /*
    this.superheroesService.subscribeToEvent('NewSuperhero', (data) => {
      const superHero = {
        id: data.args.id,
        name: data.args.name,
        category: data.args.category,
        avatar: data.args.avatar,
        description: data.args.description,
        isOpen: true
      };
      setTimeout(() => {
        superHero.isOpen = false;
      }, 1000);
      this.superheroes.unshift(superHero);
    });
  */

  }

}

import {Component} from '@angular/core';
import {SuperheroesService} from '../../services/superheroes.service';
import {ActivatedRoute} from '@angular/router';
import {Superhero} from '../../interfaces/Hero';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSnackBar} from '@angular/material';
import {environment} from '../../../../environments/environment';
import Web3 from 'web3';
import {WebSocketsService} from '../../../common/services/web-sockets.service';
import {TronwebService} from '../../../common/services/tronweb.service';
import {DomSanitizer} from '@angular/platform-browser';
import {TronRpcService} from '../../../common/services/tron-rpc.service';
import {HexEncodeDecodeService} from '../../../common/services/hex-encode-decode.service';
declare let window;

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


  constructor(private superheroesService: SuperheroesService, private route: ActivatedRoute, private snackBar: MatSnackBar, private websoket: WebSocketsService, public tronweb: TronwebService, public sanitizer: DomSanitizer, public tronRPC: TronRpcService, private decodingService: HexEncodeDecodeService) {
    this.superheroes = this.route.snapshot.data.RPCData.map((item: any) => {
      const [id, name, avatar, category, description] = item;
      return {
        id,
        name,
        avatar,
        category,
        description
      };
    });

    this.websoket.socketOpened.subscribe(() => {
      this.websoket.subscribe('NewSuperhero');
    });

    this.tronRPC.rpc('getSuperHeroes()', null).then((data) => {
      const testABI = [
        {
          components: [
            {
              name: "id",
              type: "uint256"
            },
            {
              name: "name",
              type: "string"
            },
            {
              name: "avatar",
              type: "string"
            },
            {
              name: "category",
              type: "string"
            },
            {
              name: "description",
              type: "string"
            }
          ],
          name: "result",
          type: "tuple[]"
        }
      ]
      const d = this.decodingService.decode(data, testABI);
      console.log('heroes data', d);
    })
/*
    const hex = "4187d45be1d6fd9525446c20caf1174c2c9023faf7";

    console.log('Getting tron web to woek11111', this.tronweb);

    this.tronweb.setContract(window.tronWeb, hex).then((data) => {
      console.log('Contract', this.tronweb.contract);
      this.tronweb.contract.getHero(1).call().then((hero) => {
        console.log(hero);
      });
    });
*/
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

  photoURL(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  setUniverse(universe: string) {
    this.currentUniverse = universe;
  }
}

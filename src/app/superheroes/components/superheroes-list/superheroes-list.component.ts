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
import {Store, select} from '@ngrx/store';
import TronWeb from 'tronweb';
import {Observable} from 'rxjs';
import {changeProvider} from '../../../common/redux/counter.actions';

import {Api, JsonRpc} from 'eosjs';
import {JsSignatureProvider} from 'eosjs/dist/eosjs-jssig';

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
  public currentProvider: string;


  constructor(private superheroesService: SuperheroesService, private route: ActivatedRoute, private snackBar: MatSnackBar, private websoket: WebSocketsService, public tronweb: TronwebService, public sanitizer: DomSanitizer, public tronRPC: TronRpcService, private decodingService: HexEncodeDecodeService, private store: Store<{ provider: string }>) {

    /*
    // FETCH EOS HEROES
    const requestdata = {
      'json': true,
      'code': 'superheroes1',
      'scope': 'superheroes1',
      'table': 'heroes'
    };
    fetch(`${environment.EOSAddress}/v1/chain/get_table_rows`, {
      method: 'POST',
      body: JSON.stringify(requestdata)
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
    });

     */


    const defaultPrivateKey = '5Je4LmjwJwArRB1hUZi5f3KF3h4pKkSPynxS6LNaKgSEVf6KVP5';
    const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
    const rpc = new JsonRpc(environment.EOSAddress, {fetch});
    const api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()});

    // to get data by secondary ker provide index position >1, lower_bound and upper bound same value

    rpc.get_table_rows({
      'json': true,
      'code': 'superheroes1',
      'scope': 'superheroes1',
      'table': 'reviews',
      'table_key': 'superhero_id',
      'key_type': 'i64',
      'index_position': 2,
      'lower_bound': 1,
      'upper_bound': 1
    }).then((data) => {
      console.log(data);
    });

    // by superheroid
    /*
    api.transact({
      actions: [{
        account: 'superheroes',
        name: 'addhero',
        authorization: [{
          actor: 'superheroes',
          permission: 'active',
        }],
        data: {
          superhero_name: 'Iron man',
          avatar: 'someavatar',
          category: 'Marvel',
          description: 'Super strong'
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    }).then((result) => {
      console.log(result);
    });

  */

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

    this.store.select('provider').subscribe(
      this.handleProviderChange
    );

    this.websoket.socketOpened.subscribe(() => {
      this.websoket.subscribe('NewSuperhero');
    });

    this.tronRPC.rpc('getSuperHeroes()', null).then((data) => {
      const testABI = [
        {
          components: [
            {
              name: 'id',
              type: 'uint256'
            },
            {
              name: 'name',
              type: 'string'
            },
            {
              name: 'avatar',
              type: 'string'
            },
            {
              name: 'category',
              type: 'string'
            },
            {
              name: 'description',
              type: 'string'
            }
          ],
          name: 'result',
          type: 'tuple[]'
        }
      ];
      const d = this.decodingService.decode(data, testABI);
      console.log('heroes data', d);
    });
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

  handleProviderChange = (val) => {
    this.currentProvider = val.provider;
    this.getSuperHeroes();
  };

  tronWebRequest = async () => {
    const tronWeb = new TronWeb({fullHost: 'https://api.shasta.trongrid.io/'});
    const contractContract = await tronWeb.contract().at('4187d45be1d6fd9525446c20caf1174c2c9023faf7');
    console.log('tron', contractContract);
  };

  getSuperHeroes() {
    switch (this.currentProvider) {
      case 'tron': {
        this.tronRPC.rpc('getSuperHeroes()', null).then((data) => {
          const testABI = [
            {
              components: [
                {
                  name: 'id',
                  type: 'uint256'
                },
                {
                  name: 'name',
                  type: 'string'
                },
                {
                  name: 'avatar',
                  type: 'string'
                },
                {
                  name: 'category',
                  type: 'string'
                },
                {
                  name: 'description',
                  type: 'string'
                }
              ],
              name: 'result',
              type: 'tuple[]'
            }
          ];
          const d = this.decodingService.decode(data, testABI);
          this.superheroes = d;
        });
      }
        break;
      case 'ethereum': {

      }
    }
  }

  changeProvider(event) {
    console.log(event);
    this.store.dispatch(changeProvider({provider: event}));
  }


  setUniverse(universe: string) {
    this.currentUniverse = universe;
  }
}

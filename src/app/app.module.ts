import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
const appRoutes: Routes = [
  {
    path: 'add-superhero',
    component: AddSuperheroComponent,
    data: { title: 'Heroes List' }
  }
  ,
  {
    path: '',
    redirectTo: 'superheroes',
    pathMatch: 'full'
  },
  {
    path: 'superheroes',
    resolve: {
      RPCData: PureRpcResolverService, // RPC resolver makes pure RPC request and does not require MetaMask or any other blockchain plugin
    },
    data: {
      abiMethodName: 'getSuperHeroes'
    },
    component: SuperheroesListComponent
  },
  {
    path: 'superheroes/:id',
    component: SuperheroDetailsComponent,
    resolve: {
      // hero: HeroDetailResolverService, Standard web3 injected resolver. Requires MetaMask
      reviews: ReviewsRpcResolverService,
      RPCData: PureRpcResolverService // RPC resolver makes pure RPC request and does not require MetaMask or any other blockchain plugin
    },
    data: {
      abiMethodName: 'getHero',
      abiMethodParameter: 'id',
      abiMethods: [{
        name: 'getHero',
        parameter: 'id'
      }
      ]
    }
  }
];

import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule
} from '@angular/material';
import {SuperheroesListComponent} from './superheroes/components/superheroes-list/superheroes-list.component';
import {SuperheroesModule} from './superheroes/superheroes.module';
import {AddSuperheroComponent} from './superheroes/components/add-superhero/add-superhero.component';
import {SuperheroDetailsComponent} from './superheroes/components/superhero-details/superhero-details.component';
import { NavComponent } from './common/components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {UtilModule} from './common/services/util.module';
import {Web3Service} from './common/services/web3.service';
import {SuperheroesService} from './superheroes/services/superheroes.service';
import {PureRpcResolverService} from './common/services/pure-rpc-resolver.service';
import {ReviewsRpcResolverService} from './common/services/reviews-rpc-resolver.service';
import {ReviewsResolverService} from './superheroes/services/reviews-resolver.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SuperheroesModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    UtilModule
  ],
  providers: [
    Web3Service,
    SuperheroesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
    path: 'superheroes/:id',
    component: SuperheroDetailsComponent,
    resolve: {
      hero: HeroDetailResolverService
    }
  },
  {
    path: 'add-superhero',
    component: AddSuperheroComponent,
    data: { title: 'Heroes List' }
  }
  ,
  {
    path: '',
    resolve: {
      web3: Web3ResolverService,
      contractABI: ContractAbiResolverService,
      superheroes: SuperheroesResolverService
    },
    component: SuperheroesListComponent,
    data: { title: 'Heroes List' }
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
import {HeroDetailResolverService} from './superheroes/services/hero-detail-resolver.service';
import {Web3ResolverService} from './common/services/web3-resolver.service';
import {ContractAbiResolverService} from './common/services/contract-abi-resolver.service';
import {SuperheroesResolverService} from './superheroes/services/superheroes-resolver.service';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

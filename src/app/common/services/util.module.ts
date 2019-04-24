import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Web3Service} from './web3.service';
import {SuperheroDetailsComponent} from '../../superheroes/components/superhero-details/superhero-details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    Web3Service,
    SuperheroDetailsComponent
  ],
  declarations: []
})
export class UtilModule {
}

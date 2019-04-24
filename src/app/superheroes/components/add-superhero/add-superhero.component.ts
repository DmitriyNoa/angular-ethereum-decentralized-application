import { Component, OnInit } from '@angular/core';
import {SuperheroesService} from '../../services/superheroes.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-superhero',
  templateUrl: './add-superhero.component.html',
  styleUrls: ['./add-superhero.component.css']
})
export class AddSuperheroComponent implements OnInit {

  hero: any = {

  }

  categories = ['Marvel', 'DC', 'JavaScript'];

  constructor(private superheroService: SuperheroesService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  addHero(hero) {
    if (hero) {
      this.superheroService.addHero(hero).then(() => {
        this.hero = {};
        this.snackBar.open('Hero added', '', {
          duration: 2000,
        });
      });
    }
  }
}

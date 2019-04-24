import { Component, OnInit } from '@angular/core';
import {SuperheroesService} from '../../services/superheroes.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-superheroes-list',
  templateUrl: './superheroes-list.component.html',
  styleUrls: ['./superheroes-list.component.css']
})
export class SuperheroesListComponent implements OnInit {

  public superheroes = [];

  constructor(private superheroesService: SuperheroesService, private route: ActivatedRoute) {
    this.superheroes = this.route.snapshot.data.superheroes;
  }

  ngOnInit() {

  }

}

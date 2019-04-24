import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Superhero} from '../../interfaces/Hero';

@Component({
  selector: 'app-superhero-details',
  templateUrl: './superhero-details.component.html',
  styleUrls: ['./superhero-details.component.css']
})
export class SuperheroDetailsComponent implements OnInit {

  public hero: Superhero;
  public superheroReviews: any[];

  constructor(private route: ActivatedRoute) {
    this.hero = this.route.snapshot.data.hero;
    this.superheroReviews = this.route.snapshot.data.reviews;
  }

  ngOnInit() {
  }

}

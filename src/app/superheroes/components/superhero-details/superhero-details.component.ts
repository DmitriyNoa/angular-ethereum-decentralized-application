import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-superhero-details',
  templateUrl: './superhero-details.component.html',
  styleUrls: ['./superhero-details.component.css']
})
export class SuperheroDetailsComponent implements OnInit {

  public hero = {};

  constructor(private route: ActivatedRoute) {
    this.hero = this.route.snapshot.data.hero;
  }

  ngOnInit() {
  }

}

import { TestBed } from '@angular/core/testing';

import { SuperheroesService } from './superheroes.service';

describe('SuperheroesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuperheroesService = TestBed.get(SuperheroesService);
    expect(service).toBeTruthy();
  });
});

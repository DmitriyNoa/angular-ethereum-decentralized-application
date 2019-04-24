import { TestBed } from '@angular/core/testing';

import { SuperheroesResolverService } from './superheroes-resolver.service';

describe('SuperheroesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuperheroesResolverService = TestBed.get(SuperheroesResolverService);
    expect(service).toBeTruthy();
  });
});

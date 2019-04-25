import { TestBed } from '@angular/core/testing';

import { HeroesListPipePipe } from './heroes-list-pipe.service';

describe('HeroesListPipeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeroesListPipePipe = TestBed.get(HeroesListPipePipe);
    expect(service).toBeTruthy();
  });
});

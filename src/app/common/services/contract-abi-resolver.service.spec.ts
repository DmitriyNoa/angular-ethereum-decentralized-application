import { TestBed } from '@angular/core/testing';

import { ContractAbiResolverService } from './contract-abi-resolver.service';

describe('ContractAbiResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractAbiResolverService = TestBed.get(ContractAbiResolverService);
    expect(service).toBeTruthy();
  });
});

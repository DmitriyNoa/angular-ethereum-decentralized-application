import { TestBed } from '@angular/core/testing';

import { TronRpcService } from './tron-rpc.service';

describe('TronRpcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TronRpcService = TestBed.get(TronRpcService);
    expect(service).toBeTruthy();
  });
});

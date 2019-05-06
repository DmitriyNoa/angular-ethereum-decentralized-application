import { TestBed } from '@angular/core/testing';

import { RPCService } from './rpc.service';

describe('RPCService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RPCService = TestBed.get(RPCService);
    expect(service).toBeTruthy();
  });
});

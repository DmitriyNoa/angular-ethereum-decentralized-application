import { TestBed } from '@angular/core/testing';

import { WebSocketsService } from './web-sockets.service';

describe('WebSocketsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebSocketsService = TestBed.get(WebSocketsService);
    expect(service).toBeTruthy();
  });
});

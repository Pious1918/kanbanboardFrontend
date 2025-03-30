import { TestBed } from '@angular/core/testing';

import { AuthredirectService } from './authredirect.service';

describe('AuthredirectService', () => {
  let service: AuthredirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthredirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

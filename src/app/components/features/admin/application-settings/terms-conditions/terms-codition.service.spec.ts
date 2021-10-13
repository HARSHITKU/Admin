import { TestBed } from '@angular/core/testing';

import { TermsCoditionService } from './terms-codition.service';

describe('TermsCoditionService', () => {
  let service: TermsCoditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermsCoditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

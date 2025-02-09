import { TestBed } from '@angular/core/testing';

import { GetapiserviceService } from './getapiservice.service';

describe('GetapiserviceService', () => {
  let service: GetapiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetapiserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { VendorRemarkService } from './vendor-remark.service';

describe('VendorRemarkService', () => {
  let service: VendorRemarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorRemarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

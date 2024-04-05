import { TestBed } from '@angular/core/testing';

import { CompanyAdminService } from './company-admin.service';

describe('CompanyAdminService', () => {
  let service: CompanyAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

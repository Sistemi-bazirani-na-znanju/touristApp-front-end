import { TestBed } from '@angular/core/testing';

import { RoleGuard } from './auth-guard.guard';

describe('AuthGuardGuard', () => {
  let guard: RoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AdminRemisionService } from './admin-remision.service';

describe('AdminRemisionService', () => {
  let service: AdminRemisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRemisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { AdminToolsService } from './admin-tools.service';

describe('AdminToolsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminToolsService]
    });
  });

  it('should be created', inject([AdminToolsService], (service: AdminToolsService) => {
    expect(service).toBeTruthy();
  }));
});

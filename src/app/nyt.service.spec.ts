import { TestBed, inject } from '@angular/core/testing';

import { NytService } from './nyt.service';

describe('NytService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NytService]
    });
  });

  it('should be created', inject([NytService], (service: NytService) => {
    expect(service).toBeTruthy();
  }));
});

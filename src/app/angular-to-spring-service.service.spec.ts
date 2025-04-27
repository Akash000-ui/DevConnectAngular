import { TestBed } from '@angular/core/testing';

import { AngularToSpringServiceService } from './angular-to-spring-service.service';

describe('AngularToSpringServiceService', () => {
  let service: AngularToSpringServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularToSpringServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

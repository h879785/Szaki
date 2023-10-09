import { TestBed } from '@angular/core/testing';

import { GrouppostService } from './grouppost.service';

describe('GrouppostService', () => {
  let service: GrouppostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrouppostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

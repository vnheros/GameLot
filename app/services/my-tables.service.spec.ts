import { TestBed, inject } from '@angular/core/testing';

import { MyTablesService } from './my-tables.service';

describe('MyTablesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyTablesService]
    });
  });

  it('should be created', inject([MyTablesService], (service: MyTablesService) => {
    expect(service).toBeTruthy();
  }));
});

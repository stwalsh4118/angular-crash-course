import { TestBed } from '@angular/core/testing';

import { TaskAddValidationService } from './task-add-validation.service';

describe('TaskAddValidationService', () => {
  let service: TaskAddValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskAddValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

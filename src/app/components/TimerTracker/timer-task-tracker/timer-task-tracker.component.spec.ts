import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerTaskTrackerComponent } from './timer-task-tracker.component';

describe('TimerTaskTrackerComponent', () => {
  let component: TimerTaskTrackerComponent;
  let fixture: ComponentFixture<TimerTaskTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerTaskTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerTaskTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

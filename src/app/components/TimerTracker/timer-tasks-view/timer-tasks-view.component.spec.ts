import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerTasksViewComponent } from './timer-tasks-view.component';

describe('TimerTasksViewComponent', () => {
  let component: TimerTasksViewComponent;
  let fixture: ComponentFixture<TimerTasksViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerTasksViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerTasksViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerTaskComponent } from './timer-task.component';

describe('TimerTaskComponent', () => {
  let component: TimerTaskComponent;
  let fixture: ComponentFixture<TimerTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

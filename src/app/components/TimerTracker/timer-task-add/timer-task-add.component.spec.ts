import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerTaskAddComponent } from './timer-task-add.component';

describe('TimerTaskAddComponent', () => {
  let component: TimerTaskAddComponent;
  let fixture: ComponentFixture<TimerTaskAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerTaskAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerTaskAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

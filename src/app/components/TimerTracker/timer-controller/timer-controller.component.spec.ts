import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerControllerComponent } from './timer-controller.component';

describe('TimerControllerComponent', () => {
  let component: TimerControllerComponent;
  let fixture: ComponentFixture<TimerControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

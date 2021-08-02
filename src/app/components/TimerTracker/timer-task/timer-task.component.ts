import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { CdTimerComponent } from "angular-cd-timer";
import { TimerTask } from "src/app/TimerTask";

@Component({
	selector: "app-timer-task",
	templateUrl: "./timer-task.component.html",
	styleUrls: ["./timer-task.component.css"],
})
export class TimerTaskComponent implements OnInit {
	@Input() timerTask!: TimerTask;
	@ViewChild("timer") timer!: CdTimerComponent;
	constructor() {}

	ngOnInit(): void {}

	autoStop(): void {
		this.timer.stop();
	}
}

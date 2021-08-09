import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { CdTimerComponent } from "angular-cd-timer";
import { TimerTask } from "src/app/TimerTask";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { TimerService } from "src/app/services/timer.service";

@Component({
	selector: "app-timer-task",
	templateUrl: "./timer-task.component.html",
	styleUrls: ["./timer-task.component.css"],
})
export class TimerTaskComponent implements OnInit {
	@Input() timerTask!: TimerTask;
	@ViewChild("timer") timer!: CdTimerComponent;
	faTimes = faTimes;
	constructor(private timerService: TimerService) {}

	ngOnInit(): void {}

	autoStop(): void {
		this.timer.stop();
	}

	deleteTask(): void {
		this.timerService
			.deleteTask(this.timerTask)
			.subscribe(() => this.timerService.updateTimerTask(this.timerTask));
	}
}

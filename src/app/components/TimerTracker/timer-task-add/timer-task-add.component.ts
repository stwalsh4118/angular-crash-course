import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { TaskAddValidationService } from "src/app/services/task-add-validation.service";
import { TimerService } from "src/app/services/timer.service";
import { TimerTask } from "src/app/TimerTask";

@Component({
	selector: "app-timer-task-add",
	templateUrl: "./timer-task-add.component.html",
	styleUrls: ["./timer-task-add.component.css"],
})
export class TimerTaskAddComponent implements OnInit {
	timerTaskDescription!: string;
	timerTaskLength!: string;

	constructor(
		private timerService: TimerService,
		private validation: TaskAddValidationService
	) {}

	ngOnInit(): void {}

	onSubmit(): void {
		if (!this.timerTaskDescription) {
			alert("Please add a description for your task!");
			return;
		} else if (!this.timerTaskLength) {
			alert("Please add a duration for your task!");
			return;
		}

		const convertedTime = this.validation.convertTimeToTickCount(
			this.timerTaskLength
		);

		if (convertedTime === -1) {
			alert("Task length format incorrect!");
			return;
		}

		const newTimerTask: TimerTask = {
			taskDescription: this.timerTaskDescription,
			taskLength: convertedTime,
		};

		this.timerTaskDescription = "";
		this.timerTaskLength = "";

		this.timerService
			.addTimerTask(newTimerTask)
			.subscribe(() => this.timerService.taskChange(-1));
	}
}

import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { TimerService } from "src/app/services/timer.service";
import { TimerTask } from "src/app/TimerTask";
import { TimerControllerComponent } from "../timer-controller/timer-controller.component";

@Component({
	selector: "app-timer-task-tracker",
	templateUrl: "./timer-task-tracker.component.html",
	styleUrls: ["./timer-task-tracker.component.css"],
})
export class TimerTaskTrackerComponent implements OnInit {
	timerTasks: TimerTask[] = [];
	currentTask: TimerTask = this.timerTasks[0];
	subscription!: Subscription;

	@ViewChild(TimerControllerComponent)
	timerController!: TimerControllerComponent;

	constructor(private timerService: TimerService) {
		this.subscription = this.timerService
			.onTasksChange()
			.subscribe(() => this.loadTimerTasks(1));
	}

	ngOnInit(): void {
		this.loadTimerTasks(1);
	}

	onTasksLoaded(timerTasks: TimerTask[], taskID: number): void {
		this.timerTasks = timerTasks;
		let foundFromTaskID: TimerTask | undefined = timerTasks.find(
			(task) => task.id === taskID
		);
		if (typeof foundFromTaskID !== "undefined") {
			this.currentTask = foundFromTaskID;
		} else {
			this.currentTask = timerTasks[0];
		}
		this.timerController.currentTask = this.currentTask;
		this.timerController.timerTasks = this.timerTasks;
		this.timerController.initTimer();
	}

	onTaskChange(timerTask: TimerTask, taskID: number): void {
		console.log(timerTask, taskID);
		this.loadTimerTasks(taskID);
	}

	loadTimerTasks(taskID: number): void {
		this.timerService
			.getTimerTasks()
			.subscribe((timerTasks) => this.onTasksLoaded(timerTasks, taskID));
	}
}

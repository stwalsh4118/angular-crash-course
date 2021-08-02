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
			.subscribe(() => this.loadTimerTasks());
	}

	ngOnInit(): void {
		this.loadTimerTasks();
	}

	onTasksLoaded(timerTasks: TimerTask[]): void {
		this.timerTasks = timerTasks;
		this.currentTask = timerTasks[0];
		this.timerController.currentTask = this.currentTask;
		this.timerController.timerTasks = this.timerTasks;
		this.timerController.initTimer();
	}

	onTaskChange(timerTask: TimerTask): void {
		console.log(timerTask);
		let newTT: TimerTask = {
			taskDescription: timerTask.taskDescription,
			taskLength: timerTask.taskLength - 10,
		};
		this.timerTasks.filter((task) => task.id !== timerTask.id);
		this.timerTasks.push(newTT);
		this.loadTimerTasks();
	}

	loadTimerTasks(): void {
		this.timerService
			.getTimerTasks()
			.subscribe((timerTasks) => this.onTasksLoaded(timerTasks));
	}
}

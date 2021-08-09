import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";
import { TimerService } from "src/app/services/timer.service";
import { TimerTask } from "src/app/TimerTask";

@Component({
	selector: "app-timer-tasks-view",
	templateUrl: "./timer-tasks-view.component.html",
	styleUrls: ["./timer-tasks-view.component.css"],
})
export class TimerTasksViewComponent implements OnInit {
	@Input() timerTasks: TimerTask[] = [];
	@Input() loaded!: boolean;
	@Output() taskClick: EventEmitter<any> = new EventEmitter();
	onDelete!: Subscription;
	onAdd!: Subscription;
	onUpdate!: Subscription;
	constructor(private timerService: TimerService) {
		this.onDelete = timerService
			.onTaskDelete()
			.subscribe((value) => this.updateTimerTasks());

		this.onAdd = timerService
			.onTaskAdd()
			.subscribe((value) => this.updateTimerTasks());

		this.onUpdate = timerService
			.onTaskUpdate()
			.subscribe((value) => this.updateTimerTasks());
	}

	ngOnInit(): void {}

	updateTimerTasks(): void {
		console.log("updating task view");
		this.timerTasks = [...this.timerTasks];
	}

	onTaskClick(timerTask: TimerTask): void {
		let timerID = timerTask.id;
		this.taskClick.emit({ timerTask: timerTask, taskID: timerID });
	}
}

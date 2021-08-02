import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { TimerTask } from "src/app/TimerTask";

@Component({
	selector: "app-timer-tasks-view",
	templateUrl: "./timer-tasks-view.component.html",
	styleUrls: ["./timer-tasks-view.component.css"],
})
export class TimerTasksViewComponent implements OnInit {
	@Input() timerTasks: TimerTask[] = [];
	@Output() taskClick: EventEmitter<any> = new EventEmitter();
	constructor() {}

	ngOnInit(): void {}

	onTaskClick(timerTask: TimerTask): void {
		this.taskClick.emit(timerTask);
	}
}

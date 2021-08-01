import { Component, OnInit } from "@angular/core";
import { TimerTask } from "src/app/TimerTask";

@Component({
	selector: "app-timer-task-tracker",
	templateUrl: "./timer-task-tracker.component.html",
	styleUrls: ["./timer-task-tracker.component.css"],
})
export class TimerTaskTrackerComponent implements OnInit {
	timerTasks!: TimerTask[];

	constructor() {}

	ngOnInit(): void {}
}

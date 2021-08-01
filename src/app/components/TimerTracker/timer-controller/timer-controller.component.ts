import { Input } from "@angular/core";
import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { CdTimerComponent } from "angular-cd-timer";
import { TimerTask } from "src/app/TimerTask";

@Component({
	selector: "app-timer-controller",
	templateUrl: "./timer-controller.component.html",
	styleUrls: ["./timer-controller.component.css"],
})
export class TimerControllerComponent implements OnInit, AfterViewInit {
	@Input() timerTasks!: TimerTask[];
	@Input() currentTask!: TimerTask;
	@ViewChild("maintimer") maintimer!: CdTimerComponent;
	timerRunning: boolean = false;
	startTime: number = 1200;

	constructor() {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.maintimer.start();
		this.maintimer.stop();
	}

	logTime(): void {
		console.log(this.maintimer.get());
	}

	subTime(): void {
		this.startTime--;
	}

	toggleTimer(): void {
		this.timerRunning = !this.timerRunning;
		if (this.timerRunning) {
			this.maintimer.start();
		} else {
			this.maintimer.stop();
			this.startTime = this.maintimer.get().tick_count;
		}
	}
}

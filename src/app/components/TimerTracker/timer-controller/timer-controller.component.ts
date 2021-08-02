import { Input } from "@angular/core";
import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { CdTimerComponent } from "angular-cd-timer";
import { TimerService } from "src/app/services/timer.service";
import { TimerTask } from "src/app/TimerTask";

@Component({
	selector: "app-timer-controller",
	templateUrl: "./timer-controller.component.html",
	styleUrls: ["./timer-controller.component.css"],
})
export class TimerControllerComponent implements OnInit, AfterViewInit {
	faRedo = faRedo;
	timerTasks: TimerTask[] = [];
	currentTask!: TimerTask;
	@ViewChild("maintimer") mainTimer!: CdTimerComponent;
	@ViewChild("remainingtimer") remainingTimer!: CdTimerComponent;

	timerRunning: boolean = false;
	startTime: number = 1200;
	remainingTime: number = 0;

	isPomodoro: boolean = true;

	constructor(private timerService: TimerService) {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.mainTimer.start();
		this.mainTimer.stop();
		this.remainingTimer.start();
		this.remainingTimer.stop();
	}

	logTime(): void {
		console.log(this.mainTimer.get());
	}

	toggleTimer(): void {
		this.timerRunning = !this.timerRunning;
		if (this.timerRunning) {
			this.mainTimer.start();
			this.remainingTimer.start();
		} else {
			this.mainTimer.stop();
			this.remainingTimer.stop();
			this.mainTimer.startTime = this.mainTimer.get().tick_count;
			this.remainingTimer.startTime =
				this.remainingTimer.get().tick_count;
			this.currentTask.taskLength = this.remainingTimer.startTime;
			this.timerService
				.updateTimerTask(this.currentTask)
				.subscribe(() => this.changeTask());
		}
	}

	changeTask(): void {
		this.timerService.taskChange();
	}

	toggleTimerMode(): void {
		this.isPomodoro = !this.isPomodoro;
		this.initTimer();
	}

	initTimer(): void {
		this.remainingTime = this.currentTask.taskLength;
		this.remainingTimer.startTime = this.remainingTime;
		this.remainingTimer.countdown = true;
		this.remainingTimer.start();
		this.remainingTimer.stop();

		if (this.isPomodoro) {
			this.mainTimer.startTime = this.startTime;
			this.mainTimer.countdown = true;
		} else {
			this.mainTimer.startTime = 0;
		}
		this.mainTimer.start();
		this.mainTimer.stop();
	}

	checkCurrentTask(): void {
		console.log(this.currentTask);
	}
}

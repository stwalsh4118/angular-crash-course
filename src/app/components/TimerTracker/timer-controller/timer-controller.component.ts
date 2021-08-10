import { Input } from "@angular/core";
import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { CdTimerComponent } from "angular-cd-timer";
import { AuthService } from "src/app/services/auth.service";
import { TimerService } from "src/app/services/timer.service";
import { TimerTask } from "src/app/TimerTask";

@Component({
	selector: "app-timer-controller",
	templateUrl: "./timer-controller.component.html",
	styleUrls: ["./timer-controller.component.css"],
})
export class TimerControllerComponent implements OnInit, AfterViewInit {
	faRedo = faRedo;
	@Input() timerTasks: TimerTask[] = [];
	@Input() get currentTask(): TimerTask {
		return this._currentTask;
	}
	set currentTask(task: TimerTask) {
		this._currentTask = task;
		this.initTimer();
	}
	private _currentTask!: TimerTask;
	@ViewChild("maintimer") mainTimer!: CdTimerComponent;
	@ViewChild("remainingtimer") remainingTimer!: CdTimerComponent;

	timerRunning: boolean = false;
	timerStartedBefore: boolean = false;
	startTime: number = 1200;
	remainingTime: number = 0;

	isPomodoro: boolean = true;

	constructor(
		private timerService: TimerService,
		private auth: AuthService
	) {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.mainTimer.startTime = 1200;
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

			this.auth
				.verifyJWT(localStorage.token)
				.subscribe((value) => this.onAuth(value, this.currentTask));
		}
	}

	onAuth(response: any, timerTask: TimerTask) {
		const username = response.sub as string;
		this.timerService.updateTimerTask(timerTask, username).subscribe();
	}

	resetTimer() {
		this.timerStartedBefore = false;
		if (this.timerRunning) {
			this.toggleTimer();
		}
		this.initTimer();
	}

	toggleTimerMode(): void {
		this.isPomodoro = !this.isPomodoro;
		this.timerStartedBefore = false;
		this.initTimer();
	}

	initTimer(): void {
		if (!this.currentTask) {
			return;
		}

		this.remainingTime = this.currentTask.taskLength;
		this.remainingTimer.startTime = this.remainingTime;
		this.remainingTimer.countdown = true;
		this.remainingTimer.start();
		this.remainingTimer.stop();

		if (!this.timerStartedBefore) {
			if (this.isPomodoro) {
				this.mainTimer.startTime = this.startTime;
				this.mainTimer.countdown = true;
			} else {
				this.mainTimer.startTime = 0;
			}
		}
		this.mainTimer.start();
		this.mainTimer.stop();
		this.timerStartedBefore = true;
	}

	checkCurrentTask(): void {
		console.log(this.currentTask);
	}
}

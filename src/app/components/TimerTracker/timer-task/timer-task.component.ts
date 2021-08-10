import {
	AfterViewChecked,
	AfterViewInit,
	Component,
	Input,
	OnInit,
	ViewChild,
} from "@angular/core";
import { CdTimerComponent } from "angular-cd-timer";
import { TimerTask } from "src/app/TimerTask";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { TimerService } from "src/app/services/timer.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
	selector: "app-timer-task",
	templateUrl: "./timer-task.component.html",
	styleUrls: ["./timer-task.component.css"],
})
export class TimerTaskComponent implements OnInit, AfterViewChecked {
	@Input() get timerTask(): TimerTask {
		return this._timerTask;
	}
	set timerTask(task: TimerTask) {
		this._timerTask = task;
		//this.updateTimer();
	}
	private _timerTask!: TimerTask;
	@ViewChild("timer") timer!: CdTimerComponent;
	faTimes = faTimes;
	constructor(
		private timerService: TimerService,
		private auth: AuthService
	) {}

	ngOnInit(): void {}

	ngAfterViewChecked(): void {
		this.updateTimer();
	}

	autoStop(): void {
		this.timer.stop();
	}

	updateTimer(): void {
		this.timer.start();
		this.timer.stop();
	}

	deleteTask(): void {
		this.auth
			.verifyJWT(localStorage.token)
			.subscribe((value) => this.onVerify(this.timerTask, value));
	}

	onVerify(timerTask: TimerTask, user: any) {
		const username = user.sub;
		this.timerService
			.deleteTimerTask(timerTask, username)
			.subscribe((value) => {
				console.log("deleting from view");
				this.timerService.deleteTask.next(timerTask.id);
			});
	}
}

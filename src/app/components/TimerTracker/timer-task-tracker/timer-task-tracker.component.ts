import {
	AfterContentChecked,
	AfterViewChecked,
	Component,
	OnInit,
	ViewChild,
} from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { TimerService } from "src/app/services/timer.service";
import { TimerTask } from "src/app/TimerTask";
import { TimerControllerComponent } from "../timer-controller/timer-controller.component";
import { faEyeDropper, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ColorPickerComponent } from "ngx-color-picker";

@Component({
	selector: "app-timer-task-tracker",
	templateUrl: "./timer-task-tracker.component.html",
	styleUrls: ["./timer-task-tracker.component.css"],
})
export class TimerTaskTrackerComponent implements OnInit {
	timerTasks: TimerTask[] = [];
	currentTask: TimerTask = this.timerTasks[0];
	tasksLoaded: boolean = false;
	taskAdded!: Subscription;
	taskDeleted!: Subscription;
	taskUpdated!: Subscription;
	user!: string;
	color: string = "#f5b8d6";
	faEyeDropper = faEyeDropper;

	@ViewChild("colorpicker")
	colorPicker!: ColorPickerComponent;
	@ViewChild(TimerControllerComponent)
	timerController!: TimerControllerComponent;

	constructor(private timerService: TimerService, private auth: AuthService) {
		this.taskAdded = this.timerService.onTaskAdd().subscribe((value) => {
			this.timerTasks.push(value);
			this.auth.verifyJWT(localStorage.token).subscribe((value) => {
				this.retrieveTasks(value);
			});
		});

		this.taskDeleted = this.timerService
			.onTaskDelete()
			.subscribe((value) => {
				console.log(value);
				if (this.currentTask.id == value) {
					if (this.currentTask.id == this.timerTasks[0].id) {
						this.currentTask = this.timerTasks[1];
					} else {
						this.currentTask = this.timerTasks[0];
					}
				}
				this.timerTasks = this.timerTasks.filter(
					(task) => task.id !== value
				);
				console.log(this.timerTasks);
			});

		this.taskUpdated = this.timerService
			.onTaskUpdate()
			.subscribe((value) => {
				const indexToUpdate = this.timerTasks.findIndex(
					(task) => task.id === value.id
				);
				this.timerTasks[indexToUpdate] = value;
				this.timerTasks = [...this.timerTasks];
			});
	}

	ngOnInit(): void {
		//this.loadTimerTasks(1);
		if (localStorage.color) {
			this.color = localStorage.color;
		}
		if (localStorage.token) {
			this.auth.verifyJWT(localStorage.token).subscribe((value) => {
				this.retrieveTasks(value);
			});
		} else {
			alert(
				"Not Logged In! Continue vusing site or login to save Tasks!"
			);
			console.log("No session token, login to retrieve tasks!");
			return;
		}
	}

	setLocalColor(): void {
		localStorage.color = this.color;
	}

	retrieveTasks(user: any): void {
		this.tasksLoaded = false;
		console.log(user);
		const subject = user.sub;
		if (user.error) {
			alert("Invalid Session Token, Login Again Please!");
			return;
		}

		let id: number;

		if (this.currentTask) {
			id = this.currentTask.id as number;
		} else {
			id = -1;
		}

		console.log(subject);
		this.timerService
			.getTasksFromDB(subject)
			.subscribe((value) => this.onTasksLoaded(value, id));
	}

	onTasksLoaded(timerTasks: TimerTask[], taskID: number): void {
		console.log(timerTasks);
		this.timerTasks = timerTasks;
		let foundFromTaskID: TimerTask | undefined = timerTasks.find(
			(task) => task.id === taskID
		);
		if (typeof foundFromTaskID !== "undefined") {
			this.currentTask = foundFromTaskID;
		} else {
			this.currentTask = timerTasks[0];
		}
		this.timerTasks.sort((a, b) => a.id! - b.id!);
		this.timerController.initTimer();
		this.tasksLoaded = true;
	}

	onTaskChange(timerTask: TimerTask, taskID: number): void {
		console.log(timerTask, taskID);
		this.loadTimerTasks(taskID);
	}

	loadTimerTasks(taskID: number): void {
		this.onTasksLoaded(this.timerTasks, taskID);
	}
}

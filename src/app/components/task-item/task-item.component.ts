import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Task } from "src/app/Task";

@Component({
	selector: "app-task-item",
	templateUrl: "./task-item.component.html",
	styleUrls: ["./task-item.component.css"],
})
export class TaskItemComponent implements OnInit {
	@Input() task!: Task;
	@Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
	@Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();

	faTimes = faTimes;

	constructor() {}

	ngOnInit(): void {}

	onDelete(task: Task): void {
		this.onDeleteTask.emit(task);
	}

	onToggle(task: Task): void {
		this.onToggleReminder.emit(task);
	}
}

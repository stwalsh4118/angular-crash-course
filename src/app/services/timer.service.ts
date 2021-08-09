import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { TimerTask } from "../TimerTask";
import { AuthService } from "./auth.service";

const httpOptions = {
	headers: new HttpHeaders({
		"Content-Type": "application/json",
	}),
};

@Injectable({
	providedIn: "root",
})
export class TimerService {
	private apiUrl: string = "http://localhost:5000/timer-tasks";
	private subject = new Subject<any>();

	constructor(private http: HttpClient, private auth: AuthService) {}

	getTimerTasks(): Observable<TimerTask[]> {
		return this.http.get<TimerTask[]>(this.apiUrl);
	}

	updateTimerTask(timerTask: TimerTask): void {
		this.subject.next(timerTask);
	}

	addTimerTask(timerTask: TimerTask, user: string): Observable<TimerTask> {
		console.log("attempting to add timer task");
		const apiUrl = "http://localhost:3000/api/addTimerTask";
		const body = {
			timerTask: timerTask,
			user: user,
		};
		console.log("after jwt verify");
		console.log(body);
		return this.http.post<TimerTask>(apiUrl, body, httpOptions);
	}

	deleteTask(timerTask: TimerTask): Observable<TimerTask> {
		const url = `${this.apiUrl}/${timerTask.id}`;
		return this.http.delete<TimerTask>(url);
	}

	onTasksChange(): Observable<any> {
		return this.subject.asObservable();
	}

	getTasksFromDB(username: string): Observable<any> {
		const url = "http://localhost:3000/api/user/" + username;
		return this.http.get<any>(url);
	}
}

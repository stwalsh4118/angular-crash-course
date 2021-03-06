import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { TimerTask } from "../TimerTask";
import { AuthService } from "./auth.service";
import { environment } from "src/environments/environment";

const httpOptions = {
	headers: new HttpHeaders({
		"Content-Type": "application/json",
	}),
};

@Injectable({
	providedIn: "root",
})
export class TimerService {
	private API_ROUTE = !environment.production
		? "http://localhost:3000/"
		: "https://habitus.writhe.dev/";

	private apiUrl: string = "http://localhost:5000/timer-tasks";
	public updateTask = new Subject<any>();
	public addTask = new Subject<any>();
	public deleteTask = new Subject<any>();

	constructor(private http: HttpClient, private auth: AuthService) {}

	getTimerTasks(): Observable<TimerTask[]> {
		return this.http.get<TimerTask[]>(this.apiUrl);
	}

	onTaskUpdate(): Observable<any> {
		return this.updateTask.asObservable();
	}

	updateTimerTask(timerTask: TimerTask, user: string): Observable<TimerTask> {
		console.log("attempting to update timer task");
		const apiUrl = this.API_ROUTE + "api/updateTimerTask";
		const body = {
			timerTask: timerTask,
			user: user,
		};
		console.log("after jwt verify");
		console.log(body);
		//this.updateTask.next(timerTask);
		return this.http.post<TimerTask>(apiUrl, body, httpOptions);
	}

	onTaskAdd(): Observable<any> {
		return this.addTask.asObservable();
	}

	addTimerTask(timerTask: TimerTask, user: string): Observable<TimerTask> {
		console.log("attempting to add timer task");
		const apiUrl = this.API_ROUTE + "api/addTimerTask";
		const body = {
			timerTask: timerTask,
			user: user,
		};
		console.log("after jwt verify");
		console.log(body);
		return this.http.post<TimerTask>(apiUrl, body, httpOptions);
	}

	onTaskDelete(): Observable<any> {
		return this.deleteTask.asObservable();
	}

	deleteTimerTask(timerTask: TimerTask, user: string): Observable<TimerTask> {
		console.log("attempting to delete timer task");
		const apiUrl = this.API_ROUTE + "api/deleteTimerTask";
		const body = {
			timerTask: timerTask,
			user: user,
		};

		return this.http.post<TimerTask>(apiUrl, body, httpOptions);
	}

	getTasksFromDB(username: string): Observable<any> {
		console.log(username);
		const url = this.API_ROUTE + "api/user/" + username;
		return this.http.get<any>(url);
	}
}

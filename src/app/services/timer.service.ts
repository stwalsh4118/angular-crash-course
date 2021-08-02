import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { TimerTask } from "../TimerTask";

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

	constructor(private http: HttpClient) {}

	getTimerTasks(): Observable<TimerTask[]> {
		return this.http.get<TimerTask[]>(this.apiUrl);
	}

	updateTimerTask(timerTask: TimerTask): Observable<TimerTask> {
		const url = `${this.apiUrl}/${timerTask.id}`;
		return this.http.put<TimerTask>(url, timerTask, httpOptions);
	}

	taskChange(): void {
		this.subject.next(true);
	}

	onTasksChange(): Observable<any> {
		return this.subject.asObservable();
	}
}

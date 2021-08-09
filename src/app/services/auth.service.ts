import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { sign } from "jsonwebtoken";
import * as CONFIG from "../../../lib/CONFIG";
import { environment } from "src/environments/environment";

const httpOptions = {
	headers: new HttpHeaders({
		"Content-Type": "application/json",
	}),
};

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private API_ROUTE = !environment.production
		? "http://localhost:3000/"
		: "https://angular-crash-course.vercel.app/";

	constructor(private http: HttpClient) {}

	verifyLogin(username: string, password: string): Observable<Object> {
		const apiEndpoint = this.API_ROUTE + "api/login";
		const body = {
			user: username,
			pass: password,
		};
		return this.http.post(apiEndpoint, body, httpOptions);
	}

	registerUser(username: string, password: string): Observable<Object> {
		const apiEndpoint = this.API_ROUTE + "api/register";
		const body = {
			user: username,
			pass: password,
		};

		return this.http.post(apiEndpoint, body, httpOptions);
	}

	signJWT(username: string): Observable<string> {
		const apiEndpoint = this.API_ROUTE + "api/signJWT";

		const body = {
			username: username,
		};
		console.log(body);
		return this.http.post<string>(apiEndpoint, body, httpOptions);
	}

	verifyJWT(token: string) {
		const apiEndpoint = this.API_ROUTE + "api/verifyJWT";

		const body = {
			token: token,
		};
		return this.http.post(apiEndpoint, body, httpOptions);
	}
}

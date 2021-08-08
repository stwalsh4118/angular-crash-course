import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { sign } from "jsonwebtoken";
import * as CONFIG from "../../../lib/CONFIG";

const httpOptions = {
	headers: new HttpHeaders({
		"Content-Type": "application/json",
	}),
};

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private apiUrl: string = "http://localhost:3000/api/test";

	constructor(private http: HttpClient) {}

	verifyLogin(username: string, password: string): Observable<Object> {
		const body = {
			user: username,
			pass: password,
		};
		return this.http.post(this.apiUrl, body, httpOptions);
	}

	signJWT(username: string): Observable<string> {
		const apiUrl = "http://localhost:3000/api/signJWT";
		const body = {
			username: username,
		};
		console.log(body);
		return this.http.post<string>(apiUrl, body, httpOptions);
	}

	verifyJWT(token: string) {
		const apiUrl = "http://localhost:3000/api/verifyJWT";
		const body = {
			token: token,
		};
		return this.http.post(apiUrl, body, httpOptions);
	}
}

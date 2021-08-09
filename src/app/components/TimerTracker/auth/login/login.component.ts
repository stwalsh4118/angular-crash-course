import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
	username!: string;
	password!: string;
	constructor(private auth: AuthService, private router: Router) {}

	ngOnInit(): void {}

	onSubmit(): void {
		if (!this.username || !this.password) {
			alert("Must have an input for Username and Password!");
			return;
		}

		this.auth
			.verifyLogin(this.username, this.password)
			.subscribe((value) => this.onAuth(value));
	}

	onAuth(response: any): void {
		console.log(response);
		const { isValidUser, user } = response as {
			isValidUser: boolean;
			user: string;
		};
		if (isValidUser == true) {
			this.auth.signJWT(user).subscribe((value) => {
				localStorage.token = value;
				this.router.navigate(["/TimerTracker"]);
			});
			return;
		} else {
			alert("Invalid Login Credentials!");
		}
	}
}

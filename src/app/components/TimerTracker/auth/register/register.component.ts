import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
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
			.registerUser(this.username, this.password)
			.subscribe((value) => this.onAuth(value));
	}

	onAuth(response: any): void {
		if (response) {
			localStorage.removeItem("token");
			this.router.navigate(["/login"]);
		} else {
			alert("Account Creation Failed!");
		}
	}
}

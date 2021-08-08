import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { CdTimerModule } from "angular-cd-timer";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { ButtonComponent } from "./components/button/button.component";
import { TasksComponent } from "./components/tasks/tasks.component";
import { TaskItemComponent } from "./components/task-item/task-item.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AddTaskComponent } from "./components/add-task/add-task.component";
import { AboutComponent } from "./components/about/about.component";
import { FooterComponent } from "./components/footer/footer.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TimerTaskTrackerComponent } from "./components/TimerTracker/timer-task-tracker/timer-task-tracker.component";
import { TimerControllerComponent } from "./components/TimerTracker/timer-controller/timer-controller.component";
import { TimerTasksViewComponent } from "./components/TimerTracker/timer-tasks-view/timer-tasks-view.component";
import { TimerTaskComponent } from "./components/TimerTracker/timer-task/timer-task.component";
import { TimerTaskAddComponent } from "./components/TimerTracker/timer-task-add/timer-task-add.component";
import { LoginComponent } from "./components/TimerTracker/auth/login/login.component";
import { RegisterComponent } from "./components/TimerTracker/auth/register/register.component";

const appRoutes: Routes = [
	{ path: "", component: TasksComponent },
	{ path: "about", component: AboutComponent },
	{ path: "TimerTracker", component: TimerTaskTrackerComponent },
	{ path: "login", component: LoginComponent },
	{ path: "register", component: RegisterComponent },
];

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ButtonComponent,
		TasksComponent,
		TaskItemComponent,
		AddTaskComponent,
		AboutComponent,
		FooterComponent,
		TimerTaskTrackerComponent,
		TimerControllerComponent,
		TimerTasksViewComponent,
		TimerTaskComponent,
		TimerTaskAddComponent,
		LoginComponent,
		RegisterComponent,
	],
	imports: [
		FontAwesomeModule,
		BrowserModule,
		HttpClientModule,
		FormsModule,
		BrowserAnimationsModule,
		MatSliderModule,
		MatSlideToggleModule,
		RouterModule.forRoot(appRoutes),
		CdTimerModule,
		MatButtonModule,
		MatTooltipModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}

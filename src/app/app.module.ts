import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { CdTimerModule } from "angular-cd-timer";
import { MatButtonModule } from "@angular/material/button";

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

const appRoutes: Routes = [
	{ path: "", component: TasksComponent },
	{ path: "about", component: AboutComponent },
	{ path: "TimerTracker", component: TimerTaskTrackerComponent },
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
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}

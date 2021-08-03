import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class TaskAddValidationService {
	constructor() {}

	convertTimeToTickCount(timeString: string): number {
		const timeUnits = timeString.split(":");
		if (timeUnits.length == 3) {
			return (
				parseInt(timeUnits[0]) * 3600 +
				parseInt(timeUnits[1]) * 60 +
				parseInt(timeUnits[2])
			);
		} else {
			return -1;
		}
	}
}

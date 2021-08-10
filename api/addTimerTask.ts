import { VercelRequest, VercelResponse } from "@vercel/node";
import { hashPassword, verifyUser } from "../src/utils/auth";
import { compare } from "bcrypt";
import { TimerTask } from "src/app/TimerTask";
import prisma from "../lib/prisma";
import { User } from ".prisma/client";

export default async (request: VercelRequest, response: VercelResponse) => {
	const { timerTask, user } = request.body as {
		timerTask: TimerTask;
		user: any;
	};

	console.log(user);

	let User: User;
	try {
		User = (await prisma.user.findUnique({
			where: { username: user },
		})) as User;
	} catch (err) {
		response.status(200).json(err);
	}

	if (!User!) {
		response.status(200).json("No User Found!");
	}

	const task = await prisma.timerTask.create({
		data: {
			user_id: User!.id,
			taskDescription: timerTask.taskDescription,
			taskLength: timerTask.taskLength,
		},
	});

	response.status(200).json("task added");
	console.log(task);
};

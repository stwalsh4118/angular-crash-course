import prisma from "../../lib/prisma";
import { TimerTask } from "src/app/TimerTask";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async (request: VercelRequest, response: VercelResponse) => {
	const { user } = request.query;
	let userId: string;
	if (typeof user === "string") {
		userId = user;
	} else {
		response.status(400);
	}

	const userProfile = await prisma.user.findFirst({
		where: { username: userId! },
	});

	const feed: TimerTask[] = await prisma.timerTask.findMany({
		where: { user_id: userProfile!.id },
	});

	response.status(200).send(feed);
};

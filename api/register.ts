import { VercelRequest, VercelResponse } from "@vercel/node";
import { registerUser } from "../src/utils/auth";

export default async (request: VercelRequest, response: VercelResponse) => {
	const { user, pass } = request.body as { user: string; pass: string };
	console.log(user);
	console.log(pass);
	const validUser = await registerUser(pass, user);

	if (validUser) {
		response.status(200).send(true);
	} else {
		response.status(200).send(false);
	}
};

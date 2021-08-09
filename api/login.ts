import { VercelRequest, VercelResponse } from "@vercel/node";
import { hashPassword, verifyUser } from "../src/utils/auth";
import { compare } from "bcrypt";

export default async (request: VercelRequest, response: VercelResponse) => {
	const { user, pass } = request.body as { user: string; pass: string };
	console.log(user);
	console.log(pass);
	const validUser = await verifyUser(pass, user);
	const resp = {
		isValidUser: validUser,
		user: user,
	};
	try {
		response.status(200).send(resp);
	} catch (err) {
		response.status(204).json(resp);
	}
};

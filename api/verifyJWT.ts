import { Secret, verify } from "jsonwebtoken";
import * as CONFIG from "../lib/CONFIG";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default (request: VercelRequest, response: VercelResponse) => {
	console.log(request.body);
	const { token } = request.body as { token: string };
	try {
		const decoded = verify(token, process.env.JWT_SECRET as Secret);
		response.status(200).send(decoded);
	} catch (err) {
		console.log(err);
		response.status(200).send({ error: true });
	}
};

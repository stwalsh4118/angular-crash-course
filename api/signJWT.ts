import { sign } from "jsonwebtoken";
import * as CONFIG from "../lib/CONFIG";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default (request: VercelRequest, response: VercelResponse) => {
	console.log(request.body);
	const { username } = request.body as { username: string };
	console.log("username to sign " + username);
	const token = sign(
		{
			sub: username,
			iss: CONFIG.JWTOptions.issuer,
			aud: CONFIG.JWTOptions.audience,
		},
		CONFIG.JWTOptions.secretOrPrivateKey!,
		{ expiresIn: CONFIG.JWTOptions.expireAt }
	);
	console.log(token);
	response.status(200).json(token);
};

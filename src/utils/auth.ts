import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import prisma from "../../lib/prisma";
import * as CONFIG from "../../lib/CONFIG";

export const hashPassword = async (password: string) => {
	return await hash(password, CONFIG.saltRounds);
};

export const verifyUser = async (password: string, username: string) => {
	let User;
	try {
		User = await prisma.user.findUnique({
			where: { username: username },
		});
	} catch (err) {
		console.log(err);
		throw err;
	}

	if (!User) {
		return false;
	}

	const hashedPassword = User!.password;
	console.log(hashedPassword);

	return await compare(password, hashedPassword);
};

export const registerUser = async (username: string, password: string) => {
	let User;
	try {
		User = await prisma.user.findUnique({
			where: { username: username },
		});
	} catch (err) {
		console.log(err);
		return false;
	}

	if (!User) {
		const hashedPassword = await hashPassword(password);
		try {
			const newUser = await prisma.user.create({
				data: {
					username: username,
					password: hashedPassword,
				},
			});
			return true;
		} catch (err) {
			return false;
		}
	}

	return false;
};

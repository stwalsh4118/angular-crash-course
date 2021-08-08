export const JWTOptions = {
	secretOrPrivateKey: process.env.JWT_SECRET,
	issuer: "writhe.dev",
	audience: "writhe.dev",
	expireAt: "1m",
};

export const saltRounds = 10;

import { config } from "dotenv";

config();

export const Env = {
	LISTEN_PORT: Number(process.env.LISTEN_PORT || "0"),
	DB_HOST: process.env.DB_HOST || "",
	DB_PORT: Number(process.env.DB_PORT || "0"),
	DB_NAME: process.env.DB_NAME || "",
	DB_USER: process.env.DB_USER || "",
	DB_PASS: process.env.DB_PASS || "",
	ENABLE_SWAGGER: process.env.ENABLE_SWAGGER === "true",
	AT_SECRET: process.env.AT_SECRET || "",
	AT_EXPIRES_IN: Number(process.env.AT_EXPIRES_IN || "0"),
	APP_BASE_URL: process.env.APP_BASE_URL || "",
	APP_DOMAIN: process.env.APP_DOMAIN || "",
	APP_NAME: process.env.APP_NAME || "",
	OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY || "",
	DEPLOY_KEY: process.env.DEPLOY_KEY || "",
} as const;

console.log(Env);

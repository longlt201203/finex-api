import { Env } from "@utils";
import mongoose from "mongoose";

export async function initDbConnection() {
	const url = `mongodb://${Env.DB_HOST}:${Env.DB_PORT}`;
	await mongoose.connect(url, {
		user: Env.DB_USER,
		pass: Env.DB_PASS,
		dbName: Env.DB_NAME,
	});
}

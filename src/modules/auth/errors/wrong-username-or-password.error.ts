import { ApiError } from "@errors";

export class WrongUsernameOrPasswordError extends ApiError {
	constructor() {
		super({
			code: "wrong_username_or_password_err",
			message: "Wrong username or password",
			status: 401,
			detail: null,
		});
	}
}

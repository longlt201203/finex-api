import { ApiError } from "@errors";

export class UnauthorizedError extends ApiError {
	constructor() {
		super({
			code: "unauthorized_err",
			message: "You do not have permission to access this resource",
			status: 403,
			detail: null,
		});
	}
}

import { ApiError } from "@errors";

export class UserSubscriptionNotFoundError extends ApiError {
	constructor() {
		super({
			message: "User subscription not found",
			status: 404,
			detail: null,
			code: "user_subscription_not_found_err",
		});
	}
}

import { ApiError } from "@errors";

export class SubscriptionNotFoundError extends ApiError {
	constructor() {
		super({
			message: "Subscription not found",
			status: 404,
			detail: null,
			code: "subscription_not_found_err",
		});
	}
}

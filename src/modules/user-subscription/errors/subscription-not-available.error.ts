import { ApiError } from "@errors";

export class SubscriptionNotAvailableError extends ApiError {
	constructor() {
		super({
			message: "Subscription is not available for purchase",
			status: 400,
			detail: null,
			code: "subscription_not_available_err",
		});
	}
}

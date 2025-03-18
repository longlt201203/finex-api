import { ApiError } from "@errors";

export class BudgetNotFoundError extends ApiError {
	constructor() {
		super({
			code: "budget_not_found_err",
			message: "Budget not found",
			detail: null,
		});
	}
}

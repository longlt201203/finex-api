import { ApiError } from "@errors";

export class AnalysisNotFoundError extends ApiError {
	constructor() {
		super({
			code: "analysis_not_found_err",
			detail: null,
			message: "Analysis not found!",
		});
	}
}

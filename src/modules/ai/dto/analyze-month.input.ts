export interface AnalyzeMonthInput {
	total: number;
	dailyAnalysis: {
		total: number;
		date: number;
		month: number;
		year: number;
	}[];
	extractedRecords: {
		total: number;
		content: string;
		createdAt: Date;
		categories: string[];
	}[];
}

export interface ExtractRecordInput {
	currencyUnit: string;
	language: string;
	records: {
		content: string;
		index: number;
	}[];
}

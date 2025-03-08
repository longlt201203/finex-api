import {
	AnalyzeMonthInput,
	AnalyzeMonthOutput,
	ChatInput,
	ExtractRecordInput,
	ExtractRecordOutput,
} from "./dto";

export interface AiService {
	extractRecords(input: ExtractRecordInput): Promise<ExtractRecordOutput>;
	analyzeMonth(input: AnalyzeMonthInput): Promise<AnalyzeMonthOutput>;
	chat(input: ChatInput): Promise<string>;
}

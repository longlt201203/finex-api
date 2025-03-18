import {
	AnalyzeMonthInput,
	AnalyzeMonthOutput,
	ChatInput,
	CreateBoardInput,
	CreateBoardOutput,
	CreateBudgetInput,
	CreateBudgetOutput,
	ExtractRecordInput,
	ExtractRecordOutput,
} from "./dto";

export interface AiService {
	extractRecords(input: ExtractRecordInput): Promise<ExtractRecordOutput>;
	analyzeMonth(input: AnalyzeMonthInput): Promise<AnalyzeMonthOutput>;
	chat(input: ChatInput): Promise<string>;
	createBoard(input: CreateBoardInput): Promise<CreateBoardOutput>;
	createBudget(input: CreateBudgetInput): Promise<CreateBudgetOutput>;
}

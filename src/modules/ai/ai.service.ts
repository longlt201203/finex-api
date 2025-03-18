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
	chatStream(options: {
		data: any[];
		comments?: string[];
		onChunk: (chunk: string) => void;
		onComplete: () => void;
		onError: (error: Error) => void;
	}): void;
	createBoard(input: CreateBoardInput): Promise<CreateBoardOutput>;
	createBudget(input: CreateBudgetInput): Promise<CreateBudgetOutput>;
}

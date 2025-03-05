import { ChatInput, ExtractRecordInput, ExtractRecordOutput } from "./dto";

export interface AiService {
	extractRecords(input: ExtractRecordInput): Promise<ExtractRecordOutput>;
	chat(input: ChatInput): Promise<string>;
}

import { ExtractRecordInput, ExtractRecordOutput } from "./dto";

export interface AiService {
	extractRecords(input: ExtractRecordInput): Promise<ExtractRecordOutput>;
}

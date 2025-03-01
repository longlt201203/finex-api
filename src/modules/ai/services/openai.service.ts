import OpenAI from "openai";
import { AiService } from "../ai.service";
import {
	ExtractRecordInput,
	ExtractRecordOutput,
	ExtractRecordOutputSchema,
} from "../dto";
import { Env } from "@utils";
import { zodResponseFormat } from "openai/helpers/zod";

const openai = new OpenAI({
	apiKey: Env.OPEN_AI_API_KEY,
});

export class OpenAIService implements AiService {
	async extractRecords(
		input: ExtractRecordInput,
	): Promise<ExtractRecordOutput> {
		const response = await openai.chat.completions.create({
			model: "gpt-4o-2024-08-06",
			messages: [
				{
					role: "system",
					content: `
                        You are an AI assistant designed to help users extract daily records from JSON data efficiently. Your primary goal is to process user-provided JSON data and extract relevant information corresponding to a specific date or date range. You must ensure accuracy, handle various JSON structures, and provide well-formatted responses.
                    `,
				},
				{
					role: "user",
					content: JSON.stringify(input),
				},
			],
			response_format: zodResponseFormat(
				ExtractRecordOutputSchema,
				"extract_record_output_schema",
			),
		});
		return JSON.parse(
			response.choices[0].message.content,
		) as ExtractRecordOutput;
	}
}

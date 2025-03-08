import OpenAI from "openai";
import { AiService } from "../ai.service";
import {
	AnalyzeMonthInput,
	AnalyzeMonthOutput,
	AnalyzeMonthOutputSchema,
	ChatInput,
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
	async chat(input: ChatInput): Promise<string> {
		const response = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{
					role: "system",
					content: `You are a Personal Financial AI Assistant designed to help users manage their personal finances effectively. Your role is to provide financial literacy, budgeting guidance, expense tracking strategies, savings plans, debt management insights, and investment education. You assist users in making informed financial decisions but do not provide personalized financial, legal, or tax advice.${input.comments && input.comments.length > 0 ? ` Your last comments on the user are:\n${input.comments.join("\n")}` : ""}`,
				},
				...input.data,
			],
		});
		return response.choices[0].message.content;
	}

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

	async analyzeMonth(input: AnalyzeMonthInput): Promise<AnalyzeMonthOutput> {
		const response = await openai.chat.completions.create({
			model: "gpt-4o-2024-08-06",
			messages: [
				{
					role: "system",
					content: `
                        You are an AI assistant specialized in analyzing and describing user habits based on provided JSON data.
                    `,
				},
				{
					role: "user",
					content: JSON.stringify(input),
				},
			],
			response_format: zodResponseFormat(
				AnalyzeMonthOutputSchema,
				"analyze_month_output_schema",
			),
		});
		return JSON.parse(
			response.choices[0].message.content,
		) as AnalyzeMonthOutput;
	}
}

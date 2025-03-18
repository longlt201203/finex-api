import OpenAI from "openai";
import { AiService } from "../ai.service";
import {
	AnalyzeMonthInput,
	AnalyzeMonthOutput,
	AnalyzeMonthOutputSchema,
	ChatInput,
	CreateBoardInput,
	CreateBoardOutput,
	CreateBoardOutputSchema,
	CreateBudgetInput,
	CreateBudgetOutput,
	CreateBudgetOutputSchema,
	ExtractRecordInput,
	ExtractRecordOutput,
	ExtractRecordOutputSchema,
} from "../dto";
import { Env } from "@utils";
import { zodResponseFormat } from "openai/helpers/zod";
import {
	ChatCompletionMessage,
	ChatCompletionMessageParam,
} from "openai/resources";
import * as https from "https";

// Create a custom HTTPS agent that ignores certificate errors
const httpsAgent = new https.Agent({
	rejectUnauthorized: false,
});

const openai = new OpenAI({
	apiKey: Env.OPEN_AI_API_KEY,
	httpAgent: httpsAgent,
});

export class OpenAIService implements AiService {
	async chat(input: ChatInput): Promise<string> {
		const messages: ChatCompletionMessageParam[] = [
			{
				role: "system",
				content: `You are a Personal Financial AI Assistant designed to help users manage their personal finances effectively. Your role is to provide financial literacy, budgeting guidance, expense tracking strategies, savings plans, debt management insights, and investment education. You assist users in making informed financial decisions but do not provide personalized financial, legal, or tax advice. Answer user in Vietnamese.${input.comments && input.comments.length > 0 ? ` Your last memory of the user is:\n${input.comments.join("\n\n")}` : ""}`,
			},
		];

		if (input.comments && input.comments.length > 0) {
			// messages.push({
			// 	role: "user",
			// 	content: input.comments.join("\n\n"),
			// });
			// messages.push({
			// 	role: "assistant",
			// 	content: "OK, got it!",
			// });
			// messages.push({
			// 	role: "assistant",
			// 	content: input.comments.join("\n\n"),
			// });
		}

		// messages.push(...input.data);

		const response = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: messages,
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

	async createBoard(input: CreateBoardInput): Promise<CreateBoardOutput> {
		const response = await openai.chat.completions.create({
			model: "gpt-4o-2024-08-06",
			messages: [
				{
					role: "system",
					content: `
						You are an AI assistant specialized in helping users create financial tracking boards.
						Your task is to suggest an appropriate board setup based on the user's description.
						You should recommend a title, currency unit, and initial categories that would be helpful for the user's financial tracking needs.
						Provide a clear explanation of your suggestions to help the user understand your recommendations.
						For Vietnamese users, provide appropriate Vietnamese categories. For English users, provide English categories.
					`,
				},
				{
					role: "user",
					content: JSON.stringify(input),
				},
			],
			response_format: zodResponseFormat(
				CreateBoardOutputSchema,
				"create_board_output_schema",
			),
		});
		return JSON.parse(response.choices[0].message.content) as CreateBoardOutput;
	}

	async createBudget(input: CreateBudgetInput): Promise<CreateBudgetOutput> {
		const response = await openai.chat.completions.create({
			model: "gpt-4o-2024-08-06",
			messages: [
				{
					role: "system",
					content: `
						You are an AI assistant specialized in helping users create financial budgets.
						Your task is to suggest an appropriate budget setup based on the user's description.
						You should recommend a title, currency unit, and initial categories that would be helpful for the user's budgeting needs.
						Provide a clear explanation of your suggestions to help the user understand your recommendations.
						For Vietnamese users, provide appropriate Vietnamese categories. For English users, provide English categories.
					`,
				},
				{
					role: "user",
					content: JSON.stringify(input),
				},
			],
			response_format: zodResponseFormat(
				CreateBudgetOutputSchema,
				"create_budget_output_schema",
			),
		});
		return JSON.parse(
			response.choices[0].message.content,
		) as CreateBudgetOutput;
	}

	// Add this method to your OpenAI service implementation
	async chatStream({
		data,
		comments,
		onChunk,
		onComplete,
		onError,
	}: {
		data: ChatCompletionMessage[];
		comments?: string[];
		onChunk: (chunk: string) => void;
		onComplete: () => void;
		onError: (error: Error) => void;
	}) {
		try {
			const stream = await openai.chat.completions.create({
				model: "gpt-3.5-turbo", // or your preferred model
				messages: data,
				stream: true,
			});

			let content = "";

			for await (const chunk of stream) {
				const chunkContent = chunk.choices[0]?.delta?.content || "";
				if (chunkContent) {
					content += chunkContent;
					onChunk(chunkContent);
				}
			}

			onComplete();
		} catch (error) {
			onError(error as Error);
		}
	}
}

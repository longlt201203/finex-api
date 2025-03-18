import OpenAI from "openai";
import { AiService } from "../ai.service";
import {
	BoardModel,
	BudgetModel,
	RecordModel,
	ExtractedRecordModel,
	MonthlyAnalysisModel,
	DailyAnalysisModel,
} from "@db/models";
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
	ChatCompletionTool,
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
			// Get current date for the system message
			const currentDate = new Date();
			const formattedDate = currentDate.toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			});

			// Prepare system message with function calling capabilities and current date
			const systemMessage = {
				role: "system",
				content: `You are a Personal Financial AI Assistant designed to help users manage their personal finances effectively. Your role is to provide financial literacy, budgeting guidance, expense tracking strategies, savings plans, debt management insights, and investment education. You assist users in making informed financial decisions but do not provide personalized financial, legal, or tax advice. Answer user in the corresponding language. Today's date is ${formattedDate}. When users ask about their financial data, you can use available functions to retrieve relevant information. Always use these functions when appropriate to provide accurate and personalized responses.`,
			};

			// Add system message at the beginning if not already present
			const messages: ChatCompletionMessageParam[] = [
				systemMessage as ChatCompletionMessageParam,
				...data,
			];

			// Define available functions
			const tools: ChatCompletionTool[] = [
				{
					type: "function",
					function: {
						name: "get_budgets",
						description: "Get a list of the user's budgets",
						parameters: {
							type: "object",
							properties: {},
							required: [],
						},
					},
				},
				{
					type: "function",
					function: {
						name: "get_recent_transactions",
						description: "Get the user's recent transactions",
						parameters: {
							type: "object",
							properties: {
								budgetName: {
									type: "string",
									description:
										"The name of the budget to get transactions from",
								},
								limit: {
									type: "number",
									description:
										"Number of transactions to retrieve (default: 5)",
								},
							},
							required: ["budgetName"],
						},
					},
				},
				{
					type: "function",
					function: {
						name: "get_monthly_analysis",
						description:
							"Get analysis of the user's spending for a specific month",
						parameters: {
							type: "object",
							properties: {
								budgetName: {
									type: "string",
									description: "The name of the budget to analyze",
								},
								month: {
									type: "number",
									description: "The month to analyze (1-12)",
								},
								year: {
									type: "number",
									description: "The year to analyze",
								},
							},
							required: ["budgetName", "month", "year"],
						},
					},
				},
			];

			const stream = await openai.chat.completions.create({
				model: "gpt-4o", // Using a more capable model for function calling
				messages: messages,
				tools: tools,
				tool_choice: "auto",
				stream: true,
			});

			let content = "";
			let toolCalls: any[] = [];
			let currentToolCall = null;

			for await (const chunk of stream) {
				// Handle tool calls
				if (chunk.choices[0]?.delta?.tool_calls) {
					const deltaToolCalls = chunk.choices[0].delta.tool_calls;

					for (const deltaToolCall of deltaToolCalls) {
						if (deltaToolCall.index !== undefined) {
							// New tool call
							if (!toolCalls[deltaToolCall.index]) {
								toolCalls[deltaToolCall.index] = {
									id: deltaToolCall.id || "",
									type: deltaToolCall.type || "",
									function: {
										name: deltaToolCall.function?.name || "",
										arguments: deltaToolCall.function?.arguments || "",
									},
								};
								currentToolCall = toolCalls[deltaToolCall.index];
							} else {
								currentToolCall = toolCalls[deltaToolCall.index];

								// Append to existing tool call
								if (deltaToolCall.function?.arguments) {
									currentToolCall.function.arguments +=
										deltaToolCall.function.arguments;
								}
								if (deltaToolCall.function?.name) {
									currentToolCall.function.name = deltaToolCall.function.name;
								}
							}
						}
					}
				}

				// Handle regular content
				const chunkContent = chunk.choices[0]?.delta?.content || "";
				if (chunkContent) {
					content += chunkContent;
					onChunk(chunkContent);
				}

				// Check if we're at the end of a tool call
				if (
					chunk.choices[0]?.finish_reason === "tool_calls" &&
					toolCalls.length > 0
				) {
					// Process all tool calls
					for (const toolCall of toolCalls) {
						try {
							const functionName = toolCall.function.name;
							const args = JSON.parse(toolCall.function.arguments || "{}");

							// Execute the appropriate function based on the name
							let functionResult = "";

							if (functionName === "get_budgets") {
								functionResult = await this.getBudgets();
							} else if (functionName === "get_recent_transactions") {
								functionResult = await this.getRecentTransactions(
									args.budgetName,
									args.limit || 5,
								);
							} else if (functionName === "get_monthly_analysis") {
								functionResult = await this.getMonthlyAnalysis(
									args.budgetName,
									args.month - 1,
									args.year,
								);
							}

							// Create a new conversation with the tool response included
							const updatedMessages: ChatCompletionMessageParam[] = [
								...messages,
								{
									role: "assistant",
									content: null,
									tool_calls: [toolCall],
								},
								{
									role: "tool",
									tool_call_id: toolCall.id,
									content: functionResult,
								},
							];

							// Continue the conversation with the tool response
							const continuationResponse = await openai.chat.completions.create(
								{
									model: "gpt-4o",
									messages: updatedMessages,
									stream: true,
								},
							);

							// Stream the continuation response
							for await (const contChunk of continuationResponse) {
								const contContent = contChunk.choices[0]?.delta?.content || "";
								if (contContent) {
									content += contContent;
									onChunk(contContent);
								}
							}
						} catch (error) {
							console.error("Error executing tool call:", error);
							onChunk(`\n[Error retrieving data: ${error.message}]\n`);
						}
					}
				}
			}

			onComplete();
		} catch (error) {
			onError(error as Error);
		}
	}

	// Helper methods to execute the function calls using real database models
	private async getBudgets(): Promise<string> {
		try {
			const budgets = await BudgetModel.find({ isDeleted: false })
				.sort({ createdAt: -1 })
				.limit(10);

			return JSON.stringify({
				count: budgets.length,
				budgets: budgets.map((budget) => ({
					id: budget._id.toString(),
					title: budget.title,
					currencyUnit: budget.currencyUnit,
					language: budget.language,
					createdAt: budget.createdAt,
				})),
			});
		} catch (error) {
			console.error("Error fetching budgets:", error);
			return JSON.stringify({ error: "Failed to retrieve budgets" });
		}
	}

	private async getRecentTransactions(
		budgetName: string,
		limit: number,
	): Promise<string> {
		try {
			const budget = await BudgetModel.findOne({ title: budgetName });
			const extractedRecords = await ExtractedRecordModel.find({
				budget: budget._id,
			})
				.sort({ createdAt: -1 })
				.limit(limit)
				.populate("categories");

			return JSON.stringify({
				count: extractedRecords.length,
				transactions: extractedRecords.map((record) => ({
					id: record._id.toString(),
					amount: record.amount,
					content: record.content,
					createdAt: record.createdAt,
					categories: record.categories.map((cat) => cat.name),
				})),
			});
		} catch (error) {
			console.error("Error fetching transactions:", error);
			return JSON.stringify({ error: "Failed to retrieve transactions" });
		}
	}

	private async getMonthlyAnalysis(
		budgetName: string,
		month: number,
		year: number,
	): Promise<string> {
		try {
			const budget = await BudgetModel.findOne({ title: budgetName });
			const analysis = await MonthlyAnalysisModel.findOne({
				budget: budget._id,
				month: month,
				year: year,
			});

			if (!analysis) {
				return JSON.stringify({
					error: "No analysis found for the specified month and year",
				});
			}

			// Get daily analysis for the month to provide more detailed information
			const dailyAnalysis = await DailyAnalysisModel.find({
				budget: budget._id,
				month: month,
				year: year,
			}).sort({ date: 1 });

			return JSON.stringify({
				monthlyTotal: analysis.total,
				average: analysis.avg,
				median: analysis.median,
				comment: analysis.comment || "No comment available",
				dailyBreakdown: dailyAnalysis.map((day) => ({
					date: day.date,
					total: day.total,
				})),
			});
		} catch (error) {
			console.error("Error fetching monthly analysis:", error);
			return JSON.stringify({ error: "Failed to retrieve monthly analysis" });
		}
	}
}

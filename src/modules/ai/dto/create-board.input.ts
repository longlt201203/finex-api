import { z } from "zod";

export const CreateBoardInputSchema = z.object({
	prompt: z
		.string()
		.describe("User's description of the board they want to create"),
	language: z.string().describe("Language preference (e.g., 'en', 'vi')"),
});

export type CreateBoardInput = z.infer<typeof CreateBoardInputSchema>;

export const CreateBoardOutputSchema = z.object({
	title: z.string().describe("Suggested title for the board"),
	currencyUnit: z
		.string()
		.describe("Suggested currency unit (e.g., 'USD', 'VND')"),
	language: z.string().describe("Language of the board"),
	initialCategories: z
		.array(
			z.object({
				name: z.string().describe("Category name"),
				description: z.string().optional().describe("Category description"),
			}),
		)
		.describe("Suggested initial categories for the board"),
	explanation: z.string().describe("Explanation of the suggested board setup"),
});

export type CreateBoardOutput = z.infer<typeof CreateBoardOutputSchema>;

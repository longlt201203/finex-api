import { z } from "zod";

export const CreateBudgetInputSchema = z.object({
	prompt: z
		.string()
		.describe("User's description of the budget they want to create"),
	language: z.string().describe("Language preference (e.g., 'en', 'vi')"),
});

export type CreateBudgetInput = z.infer<typeof CreateBudgetInputSchema>;

export const CreateBudgetOutputSchema = z.object({
	title: z.string().describe("Suggested title for the budget"),
	currencyUnit: z
		.string()
		.describe("Suggested currency unit (e.g., 'USD', 'VND')"),
	language: z.string().describe("Language of the budget"),
	initialCategories: z
		.array(
			z.object({
				name: z.string().describe("Category name"),
				description: z.string().optional().describe("Category description"),
			}),
		)
		.describe("Suggested initial categories for the budget"),
});

export type CreateBudgetOutput = z.infer<typeof CreateBudgetOutputSchema>;

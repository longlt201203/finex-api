import { z } from "zod";

export const AnalyzeMonthOutputSchema = z.object({
	comment: z.string(),
});

export type AnalyzeMonthOutput = z.infer<typeof AnalyzeMonthOutputSchema>;

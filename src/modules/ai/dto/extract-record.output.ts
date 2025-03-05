import { z } from "zod";

export const ExtractRecordOutputSchema = z.object({
	extractedRecords: z.array(
		z.object({
			index: z.number({ description: "Index of the record" }),
			content: z.string({ description: "The extracted content of the record" }),
			amount: z.number({
				description:
					"The transaction amount, representing how much the user spent or received.",
			}),
		}),
	),
	describe: z.string({
		description:
			"A brief comment or explanation about the transaction, providing context for the spending or income.",
	}),
});

export type ExtractRecordOutput = z.infer<typeof ExtractRecordOutputSchema>;

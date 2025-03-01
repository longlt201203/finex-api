import { z } from "zod";

export const ExtractRecordOutputSchema = z.object({});

export type ExtractRecordOutput = z.infer<typeof ExtractRecordOutputSchema>;

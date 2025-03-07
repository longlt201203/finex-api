import { ChatCompletionMessage } from "openai/resources";

export interface ChatInput {
	data: ChatCompletionMessage[];
}

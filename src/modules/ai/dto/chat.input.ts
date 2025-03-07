import {
	ChatCompletionMessage,
	ChatCompletionMessageParam,
} from "openai/resources";

export interface ChatInput {
	data: ChatCompletionMessage[];
}

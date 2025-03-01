import { AiService } from "./ai.service";
import { OpenAIService } from "./services";

export class AiServiceFactory {
	private static serviceMap = {
		openai: new OpenAIService(),
	};

	static getAiService(name: keyof typeof this.serviceMap | string): AiService {
		if (!this.serviceMap[name]) throw new Error("AI Service not found");
		return this.serviceMap[name];
	}
}

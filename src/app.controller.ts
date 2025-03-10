import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { SkipAuth } from "@modules/auth";

@Controller()
@SkipAuth()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
}

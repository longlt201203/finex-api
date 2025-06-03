import {
	Controller,
	Header,
	Headers,
	Post,
	UnauthorizedException,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FrontService } from "./front.service";
import { SkipAuth } from "@modules/auth";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiResponseDto, Env } from "@utils";
import { DeployRequest } from "./dto";
import { ApiBody, ApiConsumes, ApiHeader } from "@nestjs/swagger";

@Controller("front")
@SkipAuth()
export class FrontController {
	constructor(private readonly frontService: FrontService) {}

	@Post("deploy")
	@UseInterceptors(FileInterceptor("file"))
	@ApiBody({ type: DeployRequest })
	@ApiConsumes("multipart/form-data")
	@ApiHeader({ name: "x-deploy-key", required: true })
	async deploy(
		@UploadedFile() file: Express.Multer.File,
		@Headers("x-deploy-key") deployKey: string,
	) {
		if (deployKey != Env.DEPLOY_KEY) {
			throw new UnauthorizedException();
		}
		await this.frontService.deploy(file);
		return new ApiResponseDto(null, null, "Deploy success!");
	}
}

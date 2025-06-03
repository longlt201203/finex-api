import { Module } from "@nestjs/common";
import { FrontController } from "./front.controller";
import { FrontService } from "./front.service";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
	controllers: [FrontController],
	providers: [FrontService],
	imports: [
		ServeStaticModule.forRoot({
			useGlobalPrefix: false,
			rootPath: "public",
			serveRoot: "/",
		}),
	],
})
export class FrontModule {}

import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { FrontController } from "./front.controller";
import { FrontService } from "./front.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
	controllers: [FrontController],
	providers: [FrontService],
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(process.cwd(), "public"),
			exclude: ["/api*"],
		}),
	],
})
export class FrontModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply((req, res, next) => {
				// Skip API routes
				if (req.url.startsWith("/api")) {
					return next();
				}

				// For all other routes, serve the index.html
				res.sendFile(join(process.cwd(), "public", "index.html"));
			})
			.exclude({ path: "api/(.*)", method: RequestMethod.ALL })
			.forRoutes({ path: "*", method: RequestMethod.ALL });
	}
}

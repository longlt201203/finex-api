import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Env } from "@utils";
import helmet from "helmet";
import { initDbConnection } from "@db";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";
import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

async function bootstrap() {
	await initDbConnection();

	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("/api");
	app.enableCors({ origin: "*" });
	// app.use(helmet());

	if (Env.ENABLE_SWAGGER) {
		const config = new DocumentBuilder()
			.setTitle("API Documentation")
			.setDescription("API Description")
			.setVersion("1.0")
			.addBearerAuth()
			.build();
		const document = SwaggerModule.createDocument(app, config);
		fs.writeFileSync("swagger.json", JSON.stringify(document, null, 2));
		SwaggerModule.setup("api/docs", app, document);
	}

	await app.listen(Env.LISTEN_PORT, "0.0.0.0");
}
bootstrap();

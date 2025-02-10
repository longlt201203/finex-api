import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Env } from "@utils";
import helmet from "helmet";
import { initDbConnection } from "@db";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";

async function bootstrap() {
	await initDbConnection();

	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("/api");
	app.enableCors({ origin: "*" });
	app.use(helmet());

	if (Env.ENABLE_SWAGGER) {
		const config = new DocumentBuilder()
			.setTitle("API Documentation")
			.setDescription("API Description")
			.setVersion("1.0")
			.addBearerAuth()
			.addServer("http://localhost:3000")
			.build();
		const document = SwaggerModule.createDocument(app, config);
		fs.writeFileSync("swagger.json", JSON.stringify(document, null, 2));
		SwaggerModule.setup("api/docs", app, document);
	}

	await app.listen(Env.LISTEN_PORT);
}
bootstrap();

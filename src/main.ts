import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as basicAuth from 'express-basic-auth';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // validate input data
  app.enableCors();

  // create a authentication for swagger documentations
  app.use(['/docs', '/docs-json'], basicAuth({
    challenge: true,
    users: {
      [process.env.SWAGGER_USERNAME]: process.env.SWAGGER_PASSWORD,
    },
  }));
  // Swagger Config
  const options = new DocumentBuilder()
    .setTitle('Booster')
    .setDescription('The Booster API description')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();

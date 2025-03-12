import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Photo Me')
    .setDescription('Photo Me API')
    .setVersion('1.0')
    .addTag('Photo Me')
    .build();
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: process.env.NODE_ENV === 'production',
    }),
  );
  app.enableCors();
  const documentFacroty = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFacroty);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

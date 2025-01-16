import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.useLogger(app.get(Logger));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

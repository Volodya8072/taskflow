import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(cookieParser());

  app.enableCors({
    origin: [
      'https://taskflow-9g9q.vercel.app', 
    ],
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Backend running on port ${port}`);
}

bootstrap();

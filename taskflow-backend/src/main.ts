import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://localhost:3000', // локальна розробка
      'https://<твій-frontend>.vercel.app' // фронтенд на Vercel
    ],
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Backend running on port ${port}`);
}

bootstrap();

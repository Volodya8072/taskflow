import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(cookieParser());

  const allowedOrigins = [
    'http://localhost:3000',       // локальний фронтенд
    'https://taskflow.vercel.app', // основний продакшн домен
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Дозволяємо localhost або будь-який піддомен vercel.app
      if (!origin || origin.endsWith('.vercel.app') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Backend running on port ${port}`);
}

bootstrap();

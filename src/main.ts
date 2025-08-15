import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'
import './config/firebaseConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // MUST TODO: Set SOP for production
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await app.listen(7001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { existsSync, mkdir } from 'node:fs';

var paths = [
    './public/videos',
    './public/previews',
    './public/pic'
]

for (const path of paths) {
    if (existsSync(path)) continue
    mkdir(path, { recursive: true }, (err) => { 
        console.error(`Fail to create diractory ${path}`) }
    )
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await app.listen(7001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

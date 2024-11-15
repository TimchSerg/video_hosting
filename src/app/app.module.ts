import { Module } from '@nestjs/common';
import { VideoModule } from '../video/video.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/(.*)'],
    }),
    VideoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { VideoModule } from '../video/video.module';
import { ConfigModule } from '@nestjs/config';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import configuration from 'src/config/configuration';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../', 'public'),
    //   exclude: ['/api/(.*)'],
    // }),
    DatabaseModule,
    VideoModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

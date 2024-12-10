import { Module } from '@nestjs/common';
import { VideoModule } from '../video/video.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import configuration from 'src/config/configuration';
import { DatabaseModule } from 'src/database/database.module';
console.log(join(__dirname, '../../../', 'client'))
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    VideoModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

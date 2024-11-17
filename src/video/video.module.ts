import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { VideoModel } from '../database/models/video.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      VideoModel
    ])
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}

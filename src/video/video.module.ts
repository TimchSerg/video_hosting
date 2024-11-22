import { Module } from '@nestjs/common';
import { VideoService } from './providers/video.service';
import { VideoController } from './video.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { VideoModel } from '../database/models/video.model';
import { VideoRepository } from './providers/video.repository';
import { VideoFactory } from './providers/video.factory';

@Module({
  imports: [
    SequelizeModule.forFeature([
      VideoModel
    ]),
  ],
  controllers: [VideoController],
  providers: [
    { provide: 'VideoFactory', useClass: VideoFactory },
    { provide: 'VideoRepository', useClass: VideoRepository },
    VideoService
  ],
})
export class VideoModule {}

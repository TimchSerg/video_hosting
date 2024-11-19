import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectModel } from '@nestjs/sequelize';
import { VideoModel } from '../database/models/video.model';
const ffmpeg = require('fluent-ffmpeg');

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(VideoModel)
    private videoModel: typeof VideoModel,
  ) {}

  private getVideoInfo = (inputPath: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      return ffmpeg.ffprobe(inputPath, (error, videoInfo) => {
        if (error) {
          return reject(error);
        }
  
        const { duration, size } = videoInfo.format;
  
        return resolve({
          size,
          durationInSeconds: Math.floor(duration),
        });
      });
    });
  };

  private getRandomIntegerInRange = (min, max) => {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
  
    return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
  };

  private getStartTimeInSeconds = (
    videoDurationInSeconds,
    fragmentDurationInSeconds,
  ) => {
    // by subtracting the fragment duration we can be sure that the resulting
    // start time + fragment duration will be less than the video duration
    const safeVideoDurationInSeconds =
      videoDurationInSeconds - fragmentDurationInSeconds;
  
    // if the fragment duration is longer than the video duration
    if (safeVideoDurationInSeconds <= 0) {
      return 0;
    }
  
    return this.getRandomIntegerInRange(
      0.25 * safeVideoDurationInSeconds,
      0.75 * safeVideoDurationInSeconds,
    );
  };

  async createFragmentPreview(
    inputPath,
    outputPath,
    fragmentDurationInSeconds = 4,
  ) {
    return new Promise(async (resolve, reject) => {
      const videoInfo = await this.getVideoInfo(
        inputPath,
      );

      const { durationInSeconds: videoDurationInSeconds } = videoInfo

      const startTimeInSeconds = this.getStartTimeInSeconds(
        videoDurationInSeconds,
        fragmentDurationInSeconds,
      );
      // 
      return new ffmpeg()
        .input(inputPath)
        .inputOptions([`-ss ${startTimeInSeconds}`])
        .outputOptions([
          `-t ${fragmentDurationInSeconds}`, 
          '-vcodec',
          'libwebp',
          '-loop 0', // Повторение
          '-vf fps=15', 
          '-vf scale=720:-1' // Размер 720 с соотношением сторон
        ])
        .noAudio()
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });
  };

  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
  }

  findAll(): Promise<VideoModel[]> {
    return this.videoModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}

import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

@Injectable()
export class FfmpegPipe implements PipeTransform<Express.Multer.File, Promise<any>> {

  async transform(video: Express.Multer.File): Promise<any> {
    const originalName = video.filename;
    const filename = '0_' + originalName;
    const output = path.join(video.destination, filename)
    // ffmpeg -i input.mov -c:v libx264 -pix_fmt yuv420p output.mp4
    try {
      await new ffmpeg()
        .input(video.path.toString())
        .outputOptions([
          '-c:v libx264',
          '-pix_fmt yuv420p',
          // ''
        ])
        .output(output)
        .on('end', () => {
          fs.unlink(video.destination+'/'+video.filename, err => {
            if(err) console.log('Файл не удалён', err);
            console.log('Файл успешно удалён');
          })
        })
        .run();
    } catch (error) {
      console.log('error', error);
    }

    return {
      ...video,
      filename: originalName,
      destination: video.destination
    };
  }

}
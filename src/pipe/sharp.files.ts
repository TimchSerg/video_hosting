import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import sharp from 'sharp';

@Injectable()
export class SharpFilesPipe implements PipeTransform<Express.Multer.File[], Promise<any>> {

  async transform(images: Express.Multer.File[]): Promise<any> {
    return await Promise.all(images.map(async (image: Express.Multer.File) => {
      const originalName = path.parse(image.filename).name;
      const filename = originalName + '.webp';
      console.log('images SharpFilesPipe', image);
      try {
        await sharp(image.path.toString())
        .rotate()
        .resize(1200)
        .webp({ effort: 3 })
        .toFile(path.join(image.destination, filename).toString());
      } catch (error) {
        console.log('error SharpFilesPipe', error);
      }

      return {
        ...image,
        destination: image.destination + '/' + filename
      };
    }))

  }

}
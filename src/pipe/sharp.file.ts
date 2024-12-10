import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import sharp from 'sharp';

@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File, Promise<any>> {

  async transform(image: Express.Multer.File): Promise<any> {
    console.log("SharpPipe", image)
    const originalName = path.parse(image.filename).name;
    const filename = originalName + '.webp';
    
    try {
      await sharp(image.path.toString())
      .rotate()
      .resize(1200)
      .webp({ effort: 3 })
      .toFile(path.join(image.destination, filename).toString());
    } catch (error) {
      console.log(error);
    }

    return {
      ...image,
      filename: filename,
      destination: image.destination + '/' + filename
    };
  }

}
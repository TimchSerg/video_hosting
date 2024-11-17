import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, NotFoundException } from '@nestjs/common';
import { VideoService } from './video.service';
import { UpdateVideoDto } from './dto/update-video.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uploadVideoHelper } from './upload.video.helper';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('video', {
    storage: diskStorage({
      destination: uploadVideoHelper.destinationPath,
      filename: uploadVideoHelper.customFileName,
    })
  }))
  async create(@UploadedFile() file: Express.Multer.File) {
    const originalName = file.filename.split('.')[0];
    const thumbNail = await this.videoService.createFragmentPreview(file.destination+'/'+file.filename, "./public/previews/"+originalName+".webp");
    console.log(thumbNail)
  }

  @Get()
  findAll() {
    return this.videoService.findAll();
  }

  @Get("/file/:filename")
  async getFileEmail(@Param("filename") filename: string, @Res() res: any) {
    if(filename === null) throw new NotFoundException()
    res.sendFile(filename, { root: 'public/videos'});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }
}

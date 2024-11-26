import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseInterceptors, 
  UploadedFile, 
  Res, 
  NotFoundException, 
  Req 
} from '@nestjs/common';
import { VideoService } from './providers/video.service';
import { UpdateVideoDto } from './dto/update-video.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uploadVideoHelper } from './upload.video.helper';
import { CreateVideoDto } from './dto/create-video.dto';
import {Request} from 'express';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  async create(@Body() createVideoDto: CreateVideoDto) {
    await this.videoService.create(createVideoDto)
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('video', {
    storage: diskStorage({
      destination: uploadVideoHelper.destinationPath,
      filename: uploadVideoHelper.customFileName,
    })
  }))
  async upload(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File
  ) {
    const baseUrl = `${req.protocol}://${req.get('Host')}`;
    const originalName = file.filename.split('.')[0];
    const thumbnail = "./public/previews/"+originalName+".webp"
    await this.videoService.createFragmentPreview(file.destination+'/'+file.filename, thumbnail);
    
    return {  
      urlVideo: baseUrl + '/api/video/file/video/' + file.filename, 
      thumbNail: baseUrl + '/api/video/file/thumbnail/' + originalName + ".webp"
    }
  }

  @Get()
  async findAll() {
    return await this.videoService.findAll();
  }

  @Get("/file/video/:filename")
  async getFileVideo(@Param("filename") filename: string, @Res() res: any) {
    if(filename === null) throw new NotFoundException()
    res.sendFile(filename, { root: 'public/videos'});
  }

  @Get("/file/thumbnail/:filename")
  async getFileThumbNail(@Param("filename") filename: string, @Res() res: any) {
    if(filename === null) throw new NotFoundException()
    res.sendFile(filename, { root: 'public/previews'});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.videoService.findOne(id);
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

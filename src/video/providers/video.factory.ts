import { Injectable } from '@nestjs/common'
import { Video } from '../entities/video.entity'
import { Id } from 'src/values/id.values'
import { UUID } from 'utils/uuid'

@Injectable()
export class VideoFactory {

  constructor () {}
  
  async create(
    name: string,
    title: string,
    filename: string,
    urlVideo: string,
    thumbNail: string,
    pic: string
  ): Promise<Video> {

    return new Video(
      new Id(UUID.generate()),
      name,
      title,
      filename,
      urlVideo,
      thumbNail,
      pic,
      new Date()
    )
  }
}
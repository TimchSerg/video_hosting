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
    urlVideo: string,
    thumbNail: string,
  ): Promise<Video> {

    return new Video(
      new Id(UUID.generate()),
      name,
      title,
      urlVideo,
      thumbNail,
      new Date()
    )
  }
}
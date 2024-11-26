import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { VideoModel } from 'src/database/models/video.model'
import { Video } from '../entities/video.entity'
import { Id } from 'src/values/id.values'
import { UUID } from 'utils/uuid'

function reconstitute(videoModel: VideoModel): Video {
  return new Video(
    new Id(UUID.from(videoModel.id)),
    videoModel.name,
    videoModel.title,
    videoModel.urlVideo,
    videoModel.thumbNail,
    videoModel.createdAt
  )
}

@Injectable()
export class VideoRepository {
  constructor(
    @InjectModel(VideoModel)
    private videoModel: typeof VideoModel
  ) {}

  async getById(id: Id): Promise<Video | null> {
    const model = await this.videoModel.findOne({ 
      where: { id: id.value.toString() } 
    })
    return model == null ? null : reconstitute(model)
  }

  async getAll(): Promise<Video[]> {
    const array = await this.videoModel.findAll()
    return array.map((model) => reconstitute(model))
  }

  async save(video: Video): Promise<void> {
    const [ model ] = await this.videoModel.findOrBuild({
      where: { id: video.id.value.toString() } 
    })

    model.set({
      id: video.id.value.toString(),
      name: video.name,
      title: video.title,
      urlVideo: video.urlVideo,
      thumbNail: video.thumbNail,
      createdAt: video.createdAt
    })

    await model.save()
  }

  async delete(video: Video): Promise<void> {
    await this.videoModel.destroy({ 
      where: { id: video.id.value.toString() }
    })
  }
}
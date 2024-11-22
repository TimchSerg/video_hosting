import { Id } from "src/values/id.values"

export class Video {
  private _id: Id
  private _name: string
  private _urlVideo: string
  private _thumbNail: string
  private _createdAt: Date

  constructor(
    id: Id,
    name: string,
    urlVideo: string,
    thumbNail: string,
    createdAt: Date
  ) {
    this._id = id
    this._name = name
    this._urlVideo = urlVideo
    this._thumbNail = thumbNail
    this._createdAt = createdAt
  }

  get id(): Id {
    return this._id
  }

  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name
  }

  get urlVideo(): string {
    return this._urlVideo
  }

  set urlVideo(urlVideo: string) {
    this._urlVideo = urlVideo
  }

  get thumbNail(): string {
    return this._thumbNail
  }

  set thumbNail(thumbNail: string) {
    this._thumbNail = thumbNail
  }

  get createdAt(): Date {
    return this._createdAt
  }

  equals(video: Video): boolean {
    return this.id.equals(video.id)
  }
}

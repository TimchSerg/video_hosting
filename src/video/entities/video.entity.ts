import { Id } from "src/values/id.values"

export class Video {
  private _id: Id
  private _name: string
  private _title: string
  private _filename: string
  private _urlVideo: string
  private _thumbNail: string
  private _pic: string
  private _createdAt: Date

  constructor(
    id: Id,
    name: string,
    title: string,
    filename: string,
    urlVideo: string,
    thumbNail: string,
    pic: string,
    createdAt: Date
  ) {
    this._id = id
    this._name = name
    this._title = title
    this._filename = filename
    this._urlVideo = urlVideo
    this._thumbNail = thumbNail
    this._pic = pic
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

  get title(): string {
    return this._title
  }

  set title(title: string) {
    this._title = title
  }

  get filename(): string {
    return this._filename
  }

  set filename(filename: string) {
    this._filename = filename
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

  get pic(): string {
    return this._pic
  }

  set pic(pic: string) {
    this._pic = pic
  }

  get createdAt(): Date {
    return this._createdAt
  }

  equals(video: Video): boolean {
    return this.id.equals(video.id)
  }
}

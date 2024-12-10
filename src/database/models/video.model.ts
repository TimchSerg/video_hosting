import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey
} from "sequelize-typescript"

@Table({ tableName: 'video' })
export class VideoModel extends Model<VideoModel> {

  @PrimaryKey
  @Column(DataType.UUID)
  id!: string

  @Column(DataType.TEXT)
  name!: string

  @Column(DataType.TEXT)
  title!: string

  @Column(DataType.TEXT)
  filename!: string

  @Column(DataType.TEXT)
  urlVideo!: string

  @Column(DataType.TEXT)
  thumbNail!: string

  @Column(DataType.TEXT)
  pic!: string

  @Column(DataType.DATE)
  updatedAt!: Date

  @Column(DataType.DATE)
  createdAt!: Date

  @Column(DataType.DATE)
  deletedAt!: Date
}
import { DataTypes } from "sequelize"

export const videoMigration = {
  // the name of the migration is mandatory
  name: '00-video-migration',
  async up({ context: queryInterface }) {
    await queryInterface.createTable('video', {
      id: { type: DataTypes.UUID, primaryKey: true },
      name: DataTypes.TEXT,
      urlVideo: DataTypes.TEXT,
      thumbNail: DataTypes.TEXT,
      updatedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE
    })
  },
  async down({ context: queryInterface }) {
    await queryInterface.dropTable('video')
  },
}
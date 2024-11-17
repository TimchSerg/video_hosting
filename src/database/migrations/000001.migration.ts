import { QueryInterface } from "sequelize/types";
import { DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.sequelize.transaction(async () => {
    await queryInterface.createTable('video', {
      id: { type: DataTypes.UUID, primaryKey: true },
      name: DataTypes.TEXT,
      urlVideo: DataTypes.TEXT,
      thumbNail: DataTypes.TEXT,
      updatedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE
    })

  })
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.sequelize.transaction(async () => {
    await queryInterface.dropTable('video')
  })
}


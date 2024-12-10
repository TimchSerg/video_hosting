import { DataTypes } from "sequelize";

export const migration000002 = {
  name: '02-migration',
  async up({ context: queryInterface, transaction: t }) {
    await queryInterface.addColumn('video', 'filename', {type: DataTypes.TEXT, defaultValue: null}, { transaction: t })
  },
  async down({ context: queryInterface, transaction: t }) {
    await queryInterface.removeColumn('video', 'filename', { transaction: t })
  },
}

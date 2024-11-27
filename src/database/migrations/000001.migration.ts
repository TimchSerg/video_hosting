import { DataTypes } from "sequelize";

export const migration000001 = {
  name: '01-migration',
  async up({ context: queryInterface, transaction: t }) {
    await queryInterface.addColumn('video', 'pic', {type: DataTypes.TEXT, defaultValue: ''}, { transaction: t })
  },
  async down({ context: queryInterface, transaction: t }) {
    await queryInterface.removeColumn('video', 'pic', { transaction: t })
  },
}

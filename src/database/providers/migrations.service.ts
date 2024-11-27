import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import * as path from 'path';
import _Umzug, {  } from 'umzug';
import { DataTypes } from 'sequelize';
import { videoMigration } from '../migrations/00_initial';
import { migration000001 } from '../migrations/000001.migration';
const {Umzug, SequelizeStorage} = require('umzug')

export type UpOptions = _Umzug.MigrateUpOptions
export type DownOptions = _Umzug.MigrateDownOptions

// export the type helper exposed by umzug, which will have the `context` argument typed correctly
export type Migration = typeof Umzug._types.migration;

@Injectable()
export class MigrationsService {

  private umzug: _Umzug.Umzug

  constructor(
    private sequelize: Sequelize
  ) {
    this.sequelize = sequelize
    this.umzug = new Umzug({
      // storage: "sequelize",
      // storage: new SequelizeStorage({ sequelize }),
      // storageOptions: {
      //   sequelize: this.sequelize,
      //   modelName: 'SequelizeMeta',
      //   columnName: 'name'
      // },
      // migrations: {
      //   params: [
      //     this.sequelize.getQueryInterface(),
      //     Sequelize
      //   ],
      //   path: path.join(__dirname, "../migrations"),
      //   pattern: /^\d+.migration.(js|ts)$/
      // },
      // migrations: {
        // glob: "../migrations/*.{js,ts}",
        // resolve: ({name, path, context}) => {
        //   console.log("name, path, context", name, path, context)
        //   const migration = require(path)
        //   return {
        //     // adjust the parameters Umzug will
        //     // pass to migration methods when called
        //     name,
        //     up: async () => migration.up(context, Sequelize),
        //     down: async () => migration.down(context, Sequelize),
        //   }
        // },
      // },
      migrations: [
        videoMigration,
        migration000001
      ],
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      storageOptions: {
        sequelize: this.sequelize,
      },
      logger: console,
    })
  }

  async up(options?: UpOptions): Promise<void> {
    await this.umzug.up(options)
  }

  async down(options?: DownOptions): Promise<void> {
    await this.umzug.down(options)
  }
}

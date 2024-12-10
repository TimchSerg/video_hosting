import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import _Umzug, {  } from 'umzug';
import { videoMigration } from '../migrations/00_initial';
import { migration000001 } from '../migrations/000001.migration';
import { migration000002 } from '../migrations/000002.migration';
const {Umzug, SequelizeStorage} = require('umzug')

export type UpOptions = _Umzug.MigrateUpOptions
export type DownOptions = _Umzug.MigrateDownOptions

export type Migration = typeof Umzug._types.migration;

@Injectable()
export class MigrationsService {

  private umzug: _Umzug.Umzug

  constructor(
    private sequelize: Sequelize
  ) {
    this.sequelize = sequelize
    this.umzug = new Umzug({
      migrations: [
        videoMigration,
        migration000001,
        migration000002
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

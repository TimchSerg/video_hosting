import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import * as path from 'path';
import _Umzug from 'umzug';
const {Umzug} = require('umzug')

export type UpOptions = _Umzug.MigrateUpOptions
export type DownOptions = _Umzug.MigrateDownOptions

@Injectable()
export class SeederService {

  private umzug: _Umzug.Umzug

  constructor(
    private sequelize: Sequelize
  ) {
    this.sequelize = sequelize
    this.umzug = new Umzug({
      storage: "sequelize",
      storageOptions: {
        sequelize: this.sequelize
      },
      migrations: {
        params: [
          this.sequelize.getQueryInterface(),
          Sequelize
        ],
        path: path.join(__dirname, "../seeder"),
        pattern: /^[a-zA-Z]*.seed.(js|ts)$/
      }
    })
  }

  async up(options?: UpOptions): Promise<void> {
    await this.umzug.up(options)
  }

  async down(options?: DownOptions): Promise<void> {
    await this.umzug.down(options)
  }
}

import { ConfigModule, ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { SequelizeModuleOptions } from '@nestjs/sequelize'
import { Sequelize } from 'sequelize-typescript'
import { AppModule } from 'src/app/app.module'
import configuration from 'src/config/configuration'
import * as DatabaseProviders from 'src/database/providers'

export class DatabaseHelper { 

  static async createDatabase(): Promise<void> {
    const config = await this.getDatabaseConfig()
    const database = config['database']
    const connection = this.getConnection(config, 'postgres')
    try {
      await connection.query(`CREATE DATABASE "${database}"`)
      console.log(`Database '${database}' created`)
    } finally {
      await connection.close()
    }
  }

  static async dropDatabase() {
    const config = await this.getDatabaseConfig()
    const database = config['database']
    const connection = this.getConnection(config, 'postgres')
    try {
      await connection.query(`DROP DATABASE "${database}"`)
      console.log(`Database '${database}' droped`)
    } finally {
      await connection.close()
    }
  }

  static async runMigrations(options?: DatabaseProviders.UpOptions) {
    const config = await this.getDatabaseConfig()
    const connection = this.getConnection(config)
    try {
      const service = new DatabaseProviders.MigrationsService(connection)
      await service.up(options)
      console.log(`Database '${config['database']}' migrations applied`)
    } finally {
      await connection.close()
    }
  }

  static async undoMigrations(options?: DatabaseProviders.DownOptions) {
    const config = await this.getDatabaseConfig()
    const connection = this.getConnection(config)
    try {
      const service = new DatabaseProviders.MigrationsService(connection)
      await service.down(options)
      console.log(`Database '${config['database']}' migrations undo`)
    } finally {
      await connection.close()
    }
  }

  static async runSeeder(options?: DatabaseProviders.UpOptions) {
    const config = await this.getDatabaseConfig()
    const connection = this.getConnection(config)
    try {
      const service = new DatabaseProviders.SeederService(connection)
      await service.up(options)
      console.log(`Database '${config['database']}' seeder applied`)
    } finally {
      await connection.close()
    }
  }

  static async undoSeeder(options?: DatabaseProviders.DownOptions) {
    const config = await this.getDatabaseConfig()
    const connection = this.getConnection(config)
    try {
      const service = new DatabaseProviders.SeederService(connection)
      await service.down(options)
      console.log(`Database '${config['database']}' seeder undo`)
    } finally {
      await connection.close()
    }
  }

  private static async getDatabaseConfig(): Promise<Object> {
    // const module = await NestFactory.create(ConfigModule, { logger: false })
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    // const service = module.get(ConfigService)
    return configService.get<SequelizeModuleOptions>('database')
  }

  private static getConnection(
    config: Object, 
    database?: string
  ): Sequelize {
    if (database !== undefined) config['database'] = database
    console.log(`Connect to database '${config['database']}'`)
    return new Sequelize(config)
  }
}

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize'
import { VideoModel } from 'src/database/models/video.model';


async function sequelizeFactory (
  configService: ConfigService
): Promise<SequelizeModuleOptions> {

  const config = configService.get<SequelizeModuleOptions>('database');

  if (config === undefined) {
    throw new Error('Database configuration was not found')
  }

  config.models = [
    VideoModel
  ]
  
  return config
}

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: sequelizeFactory
    })
  ],
  providers: [
    // providers.MigrationsService
  ],
  exports: [
    // providers.MigrationsService,
    SequelizeModule
  ]
})
export class DatabaseModule {}

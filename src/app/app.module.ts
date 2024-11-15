import { Module } from '@nestjs/common';
import { VideoModule } from '../video/video.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import configuration from 'src/config/configuration';

async function sequelizeFactory (
  configService: ConfigService
): Promise<SequelizeModuleOptions> {

  const config = configService.get<SequelizeModuleOptions>('database');

  if (config === undefined) {
    throw new Error('Database configuration was not found')
  }

  config.models = [
    
  ]
console.log(config)
  return config
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: sequelizeFactory
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'client'),
      exclude: ['/api/(.*)'],
    }),
    VideoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

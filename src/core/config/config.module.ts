import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { validateEnvironment } from './env.validation';
import {
  BaseConfig,
  JwtConfig,
  MongoConfig
} from './configs';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvironment,
      load: [
        JwtConfig,
        MongoConfig,
        BaseConfig,
      ],
    }),
  ],
})
export class ConfigModule {}

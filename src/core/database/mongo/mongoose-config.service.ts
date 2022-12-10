import { Inject, Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigType } from '@nestjs/config';
import { MongoConfig } from '../../config';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(
    @Inject(MongoConfig.KEY)
    private readonly mongoConfig: ConfigType<typeof MongoConfig>,
  ) {}

  public createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.mongoConfig.uri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: this.mongoConfig.dbName,
    };
  }
}

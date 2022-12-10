import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';

const MODULES = [MongoModule];

@Module({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class DatabaseModule {}

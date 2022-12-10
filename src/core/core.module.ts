import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

const MODULES = [DatabaseModule, ConfigModule];

@Module({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class CoreModule {}

import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
@Module({
  imports: [CoreModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

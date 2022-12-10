import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { AppJwtService } from '@core/auth';
import { JwtConfigService } from './config/jwt-config.service';

const STRATEGIES = [JwtStrategy];

@Module({
  imports: [JwtModule.registerAsync({ useClass: JwtConfigService })],
  providers: [...STRATEGIES, AppJwtService],
  exports: [AppJwtService],
})
export class AppJwtModule {}

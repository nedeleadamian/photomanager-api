import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { JwtConfig } from '@core/config';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(
    @Inject(JwtConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JwtConfig>,
  ) {}

  public createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.jwtConfig.jwtSecret,
      signOptions: {
        expiresIn: this.jwtConfig.jwtExpire,
      },
    };
  }
}

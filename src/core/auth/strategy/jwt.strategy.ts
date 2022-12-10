import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { IAuthUser } from '@core/auth';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfig } from '../../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(JwtConfig.KEY) readonly config: ConfigType<typeof JwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    });
  }

  public async validate(payload: IAuthUser): Promise<IAuthUser> {
    return payload;
  }
}

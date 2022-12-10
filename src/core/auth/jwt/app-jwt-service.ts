import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthUser } from '@core/auth';
import { User } from '../../../api/user/schema/user.schema';

@Injectable()
export class AppJwtService {
  constructor(private readonly jwtService: JwtService) {}

  private static formatJwtPayload(user: User): User {
    return {
      _id: user._id,
      email: user.email,
    };
  }

  public generateAccessToken(userJwt: IAuthUser): string {
    return this.jwtService.sign(userJwt);
  }

  public verify(token: string) {
    return this.jwtService.verify(token);
  }
}

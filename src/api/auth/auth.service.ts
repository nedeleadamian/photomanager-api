import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { AppJwtService, IAuthUser } from '@core/auth';
import { JwtConfig } from '@core/config';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schema/user.schema';
import { RegisterInputDto } from './dto/register-input.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JwtConfig>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: AppJwtService,
  ) {}

  public async authenticate(
    email: string,
    password: string,
  ): Promise<LoginResponseDto> {
      const dbUser = await this.userModel.findOne({email});

      if (!dbUser) {
        throw new UnauthorizedException();
      }

      const comparePassPromise = new Promise((resolve, reject) => {
        dbUser.comparePassword(password, (err, isMatch) => {
          if (err) reject(err);
          resolve(isMatch);
        })
      })

      if (!await comparePassPromise) {
        throw new UnauthorizedException();
      }

      const authUser: IAuthUser = {
        _id: dbUser._id,
        email: dbUser.email,
      };

      return {
        ...authUser,
        tokens: this.createToken(authUser),
      };
  }

  public async register(input: RegisterInputDto): Promise<LoginResponseDto> {
    const { email, password } = input;

    let dbUser = await this.userModel.findOne({email});

      if (dbUser) {
        throw new HttpException('email already exist', HttpStatus.BAD_REQUEST);
      }

      const newUser = new this.userModel({email, password});
      newUser.email = email;
      newUser.password = password;

      dbUser = await newUser.save();

      const authUser: IAuthUser = {
        _id: dbUser._id,
        email: dbUser.email,
      };

      return {
        ...authUser,
        tokens: this.createToken(authUser),
      };
  }

  public createToken(user: IAuthUser): {
    accessToken: string;
    refreshToken?: string;
  } {
    return {
      accessToken: this.jwtService.generateAccessToken(user),
    };
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppJwtModule } from '@core/auth';
import { User, UserSchema } from '../user/schema/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    AppJwtModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [UserModule, AuthModule, ImageModule, TagModule],
})
export class ApiModule {}

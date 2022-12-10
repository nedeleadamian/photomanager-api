import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UserModule implements OnModuleInit {
  private readonly logger = new Logger(UserModule.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async onModuleInit(): Promise<void> {
    const adminEmail = 'admin@admin.com';
    const adminExists = await this.userModel.exists({ email: adminEmail });

    if (!adminExists) {
      this.logger.debug('Init admin user.');
      const newUser = new this.userModel({ email: adminEmail, password: 'admin123' });

      await newUser.save();
    }
  }
}

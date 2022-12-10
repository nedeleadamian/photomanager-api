import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Tag, TagSchema } from '../tag/schema/tag.schema';
import { Image, ImageSchema } from './schema/image.schema';
import { ImageMulterConfigService } from './image-multer-config.service';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }, { name: Tag.name, schema: TagSchema }]),
    MulterModule.registerAsync({ useClass: ImageMulterConfigService }),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}

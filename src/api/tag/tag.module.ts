import { Module, OnModuleInit } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Tag, TagDocument, TagSchema } from './schema/tag.schema';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { Model } from 'mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule implements OnModuleInit {
  constructor(
    @InjectModel(Tag.name)
    private readonly tagSchema: Model<TagDocument>,
  ) {}

  async onModuleInit() {
    const docs = [];
    for (let i = 0; i < 10; i++) {
      docs.push(new this.tagSchema({ name: `tag-${i}` }));
    }
    await this.tagSchema.insertMany(docs);
  }
}

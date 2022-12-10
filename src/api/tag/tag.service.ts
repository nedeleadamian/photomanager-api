import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractPaginationDto } from '@abstraction/dto/abstract-pagination.dto';
import { Model } from 'mongoose';
import { Tag, TagDocument } from './schema/tag.schema';
import { TagResultDto } from './dto/tag-result.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name)
    private readonly tagSchema: Model<TagDocument>,
  ) {}

  public async findTags(query: AbstractPaginationDto): Promise<TagResultDto> {
    const count = await this.tagSchema.count({ extension: false });
    const dbTags = await this.tagSchema
      .find({ extension: false })
      .skip((query.page - 1) * query.limit)
      .limit(query.limit)
      .sort();

    return {
      count,
      data: dbTags || [],
    };
  }
}

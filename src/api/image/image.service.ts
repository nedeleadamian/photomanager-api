import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractPaginationDto } from '@abstraction/dto/abstract-pagination.dto';
import { IAuthUser } from '@core/auth';
import { Model } from 'mongoose';
import { Tag, TagDocument } from '../tag/schema/tag.schema';
import { ImageResultDto } from './dto/image-result.dto';
import { Image, ImageDocument } from './schema/image.schema';
import { AddTagsDto } from './dto/add-tags.dto';
import { RemoveTagsDto } from './dto/remove-tags.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image.name)
    private readonly imageSchema: Model<ImageDocument>,
    @InjectModel(Tag.name)
    private readonly tagSchema: Model<TagDocument>,
  ) {}

  public async findImages(
    userId: string,
    query: AbstractPaginationDto,
  ): Promise<ImageResultDto> {
    const filter = { user: userId };
    const count = await this.imageSchema.count(filter);
    const dbImages = await this.imageSchema
      .find(filter)
      .populate('tags')
      .skip((query.page - 1) * query.limit)
      .limit(query.limit)
      .sort();

    return {
      count,
      data: dbImages || [],
    };
  }

  public async addTags(
    imageId: string,
    authUser: IAuthUser,
    body: AddTagsDto,
  ): Promise<{ success: boolean }> {
    const dbImage = await this.imageSchema
      .findOne({ _id: imageId, user: authUser._id })
      .populate('tags');
    const dbImageTagsHashMap = dbImage.tags.reduce((acc, currentTag) => {
      acc.set(currentTag._id.toString(), currentTag);

      return acc;
    }, new Map());

    const dbTags = await this.tagSchema.find(
      { _id: { $in: body.tagsIds } },
      { _id: 1 },
    );
    const newTags = dbTags.filter(
      (tag) => !dbImageTagsHashMap.has(tag._id.toString()),
    );

    dbImage.tags = [...dbImage.tags, ...newTags]

    await dbImage.save();

    return {
      success: true,
    };
  }

  public async removeTags(
    imageId: string,
    authUser: IAuthUser,
    body: RemoveTagsDto,
  ): Promise<{ success: boolean }> {
    const dbImage = await this.imageSchema
      .findOne({ _id: imageId, user: authUser._id })
      .populate('tags');

    dbImage.tags = dbImage.tags.filter(
      (tag) => !body.tagsIds.includes(tag._id.toString()) && tag.extension,
    );

    await dbImage.save();

    return {
      success: true,
    };
  }

  public async uploadImage(authUser: IAuthUser, file: Express.Multer.File) {
    const splittedFileName = file.filename.split('.');
    const fileExtension = splittedFileName[splittedFileName.length - 1];
    const extensionTag = await this.tagSchema.findOne(
      {
        name: fileExtension.toUpperCase(),
        extension: true,
      },
      { _id: 1 },
    );
    let extensionTagId;

    if (!extensionTag) {
      const newExtensionTag = new this.tagSchema({
        name: fileExtension.toUpperCase(),
        extension: true,
      });
      const savedExtensionTag = await newExtensionTag.save();
      extensionTagId = savedExtensionTag._id;
    } else {
      extensionTagId = extensionTag._id;
    }

    return new this.imageSchema({
      user: authUser._id,
      fileName: file.originalname,
      path: `images/${file.filename}`,
      mimetype: file.mimetype,
      tags: [extensionTagId],
    }).save();
  }

  public async deleteImage(
    imageId: string,
    authUser: IAuthUser,
  ): Promise<{ success: boolean }> {
    const newImage = await this.imageSchema.deleteOne({
      _id: imageId,
      user: authUser._id,
    });

    return {
      success: newImage.deletedCount === 1,
    };
  }
}

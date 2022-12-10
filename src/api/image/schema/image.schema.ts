import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Tag } from '../../tag/schema/tag.schema';
import { User } from '../../user/schema/user.schema';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image {
  public _id: string;

  @Prop({ type: String })
  public fileName: string;

  @Prop({ type: String })
  public path: string;

  @Prop({ type: String })
  public mimetype: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  public user: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Tag.name }] })
  public tags: Tag[];
}

export const ImageSchema = SchemaFactory.createForClass(Image);

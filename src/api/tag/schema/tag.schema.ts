import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TagDocument = HydratedDocument<Tag>;

@Schema()
export class Tag {
  public _id: string;

  @Prop( { type: Boolean, default: false })
  public extension: boolean;

  @Prop( { type: String, required: true })
  public name: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);

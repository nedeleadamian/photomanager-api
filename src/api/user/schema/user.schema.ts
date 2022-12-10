import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  public _id: string;

  @Prop({ type: String, required: true, unique: true })
  public email: string;

  @Prop({
    type: String,
  })
  public password?: string;

  public comparePassword?(password: string, callback: (err: unknown, isMatch: string) => unknown);
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (password, callback) {
  console.log(this);
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};

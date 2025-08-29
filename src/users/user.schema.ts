import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id?: any;
  
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 3 })
  name: string;

  @Prop({ required: true, minlength: 8 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

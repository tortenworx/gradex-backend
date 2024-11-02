import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum Gender {
  MALE,
  FEMALE,
  OTHER,
}

export enum Role {
  USER,
  FACULTY,
  SUPERADMIN,
}

@Schema()
export class User {
  @Prop({ required: true })
  id_number: string;

  @Prop({ required: true })
  first_name: string;

  @Prop()
  middle_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  mobile_number: number;

  @Prop()
  personal_email_address: string;

  @Prop({ required: true })
  educational_email_address: string;

  @Prop({ required: true, type: String, enum: Gender })
  gender: Gender;

  @Prop({ required: true, type: String, enum: Role, default: Role.USER })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

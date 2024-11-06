import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type CredentialDocument = HydratedDocument<Credential>;

@Schema()
export class Credential {
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  linked_record: User;

  @Prop({ required: true })
  user_name: string;

  @Prop({ required: true })
  salted_password: string;
}

export const CredentialSchema = SchemaFactory.createForClass(Credential);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type CredentialDocument = HydratedDocument<Credential>;

@Schema()
export class Credential {
  @Prop({ required: true })
  user_name: string;

  @Prop({ required: true })
  salted_password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  linked_record: User;
}

export const CredentialSchema = SchemaFactory.createForClass(Credential);

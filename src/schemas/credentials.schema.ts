import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CredentialDocument = HydratedDocument<Credential>;

@Schema()
export class Credential {
  @Prop({ required: true })
  user_name: string;

  @Prop({ required: true })
  salted_password: string;
}

export const CredentialSchema = SchemaFactory.createForClass(Credential);

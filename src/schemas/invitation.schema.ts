import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type InvitationDocument = HydratedDocument<Invitation>;

@Schema()
export class Invitation {
  @Prop({ type: mongoose.Schema.ObjectId, ref: User })
  for_user: User;

  @Prop({ type: Date, expires: '2190h', default: Date.now })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.ObjectId, ref: User })
  createdBy: User;
}

export const InvitationSchema = SchemaFactory.createForClass(User);

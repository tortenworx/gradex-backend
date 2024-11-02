/**
 * ? This file is unused due to the change of the design in the system,
 * ? see https://github.com/tortenworx/gradex-backend/issues/1 to learn more.
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type SubjectDocument = HydratedDocument<Subject>;

interface SubjectLinks {
  name: string;
  link: string;
}

enum Strand {
  GAS,
  STEM,
  HUMMS,
  ABM,
  TVL_HE,
  TVL_ICT,
}

@Schema()
export class Subject {
  @Prop({ type: mongoose.Schema.ObjectId, ref: User })
  adviser: User;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, type: String, enum: Strand })
  strand: Strand;
  @Prop()
  links: [SubjectLinks];
  @Prop({ type: mongoose.Schema.ObjectId, ref: User })
  students: [User];
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);

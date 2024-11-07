/**
 * ? This file is unused due to the change of the design in the system,
 * ? see https://github.com/tortenworx/gradex-backend/issues/1 to learn more.
 * ! UPDATE: Decision has been reverted.
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Subject } from './subject.schema';

export type ClassDocument = HydratedDocument<Subject>;

export interface ClassLinks {
  name: string;
  link: string;
}

export enum Strand {
  GAS = 'GAS',
  STEM = 'STEM',
  HUMMS = 'HUMMS',
  ABM = 'ABM',
  TVL_HE = 'TVL_HE',
  TVL_ICT = 'TVL_ICT',
}

@Schema()
export class Class {
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  adviser: User;
  @Prop({ required: true })
  section: string;
  @Prop({ required: true, type: String, enum: Strand })
  strand: Strand;
  @Prop()
  links: [ClassLinks];
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Subject' })
  stubjects: [Subject];
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  students: [User];
}

export const ClassSchema = SchemaFactory.createForClass(Class);

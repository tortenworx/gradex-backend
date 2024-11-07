import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Subject } from './subject.schema';

export type GradeReportDocument = HydratedDocument<Subject>;

@Schema()
export class GradeReport {
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  for_user: User;
  @Prop({ type: Date, default: Date.now })
  created_at: Date;
  @Prop({ type: Date, required: true })
  viewable_until: Date;
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Subject' })
  grades: [Subject, number];
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  created_by: User;
}

export const GradeReportSchema = SchemaFactory.createForClass(GradeReport);

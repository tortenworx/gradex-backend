import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Subject } from './subject.schema';

export type GradeReportDocument = HydratedDocument<Subject>;

export enum REPORT_TYPE {
  COLLEGE = 'COLLEGE',
  SENIOR_HIGH = 'SHS',
}

export enum REPORT_STATUS {
  EDITING = 'EDITING',
  PUBLISHED = 'PUBLISHED',
  REVIEWING = 'REVIEWING',
}

@Schema()
export class GradeReport {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Subject' })
  subject: Subject;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  created_by: User;
  @Prop({ required: true })
  semester: number;
  @Prop({
    required: true,
    type: String,
    enum: REPORT_STATUS,
    default: REPORT_STATUS.EDITING,
  })
  status: string;
  @Prop({
    required: true,
    type: String,
    enum: REPORT_TYPE,
    default: REPORT_TYPE.COLLEGE,
  })
  type: REPORT_TYPE;
  @Prop({ required: true })
  records: [
    {
      user: User;
      avg: number;
    },
  ];
}

export const GradeReportSchema = SchemaFactory.createForClass(GradeReport);

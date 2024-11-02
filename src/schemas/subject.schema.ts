import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type SubjectDocument = HydratedDocument<Subject>;

interface SubjectLinks {
  name: string;
  link: string;
}

@Schema()
export class Subject {
  @Prop({ type: mongoose.Schema.ObjectId, ref: User })
  teacher: User;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  code: string;
  @Prop({ length: 255 })
  description: string;
  @Prop()
  links: [SubjectLinks];
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);

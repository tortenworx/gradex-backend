import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from 'src/schemas/class.schema';
import { Subject } from 'src/schemas/subject.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Subject.name) private subjectModel: Model<Subject>,
    @InjectModel(Class.name) private classModel: Model<Class>,
  ) {}
}

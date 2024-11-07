import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { Subject, SubjectSchema } from '../schemas/subject.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from 'src/schemas/class.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subject.name, schema: SubjectSchema },
      { name: Class.name, schema: ClassSchema },
      { name: User.name, schema: UserSchema  },
    ]),
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}

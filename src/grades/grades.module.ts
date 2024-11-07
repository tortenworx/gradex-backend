import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  GradeReport,
  GradeReportSchema,
} from 'src/schemas/grade-report.schema';
import { Subject, SubjectSchema } from 'src/schemas/subject.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GradeReport.name, schema: GradeReportSchema },
      { name: Subject.name, schema: SubjectSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}

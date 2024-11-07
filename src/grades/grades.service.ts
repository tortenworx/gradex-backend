import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GradeReport } from 'src/schemas/grade-report.schema';
import { Subject } from 'src/schemas/subject.schema';
import { User } from 'src/schemas/user.schema';
import { CreateGradeReportDto } from './dto/create-grade-report.dto';
import { Model } from 'mongoose';

@Injectable()
export class GradesService {
  constructor(
    @InjectModel(GradeReport.name) private gradeReportModel: Model<GradeReport>,
    @InjectModel(Subject.name) private subjectModel: Model<Subject>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createReport(createGradeReportDto: CreateGradeReportDto, originUserId: string) {
    const originUser = await this.userModel.findById(originUserId);
    const studentUser = await this.userModel.findById(createGradeReportDto.for_user)
    if (!originUser) throw new NotFoundException('No user attached on the authorization header. Contact support.')
    if (!studentUser) throw new NotFoundException('No student user found with attached ID. Check ID and try again.')
  }
}

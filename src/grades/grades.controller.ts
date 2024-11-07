import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { GradesService } from './grades.service';
import { Roles } from 'src/credentials/decorator/roles.decorator';
import { CreateGradeReportDto } from './dto/create-grade-report.dto';
import { CredentialsGuard } from 'src/credentials/credentials.guard';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post('/create-report')
  @Roles(['FACULTY'])
  @UseGuards(CredentialsGuard)
  async createGradeReport(
    @Request() request,
    createGradeReportDto: CreateGradeReportDto,
  ): Promise<any> {
    return await this.gradesService.createReport(
      createGradeReportDto,
      request.user.sub,
    );
  }
}

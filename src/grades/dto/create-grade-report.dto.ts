import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { REPORT_STATUS, REPORT_TYPE } from '../../schemas/grade-report.schema';
export class CreateGradeReportDto {
  @IsMongoId()
  @IsNotEmpty()
  subject: string;
  @IsEnum(REPORT_TYPE)
  @IsNotEmpty()
  type: REPORT_TYPE;
  @IsOptional()
  @IsEnum(REPORT_STATUS)
  status: REPORT_STATUS;
  @IsNumber()
  @IsNotEmpty()
  semester: number;
  @IsArray()
  grades: [
    {
      user: string;
      avg: number;
    },
  ];
}

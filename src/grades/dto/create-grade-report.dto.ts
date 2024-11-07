import { IsArray, IsDate, IsMongoId, IsNotEmpty } from 'class-validator';
import { Subject } from 'src/schemas/subject.schema';

export class CreateGradeReportDto {
  @IsNotEmpty()
  @IsMongoId()
  for_user: string;
  @IsArray()
  grades: [Subject, number];
  @IsDate()
  viewable_until: Date;
}

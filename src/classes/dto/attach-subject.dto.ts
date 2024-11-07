import { IsMongoId, IsNotEmpty } from 'class-validator';

export class AttachSubjectToClassDto {
  @IsMongoId()
  @IsNotEmpty()
  subject: string;
  @IsMongoId()
  @IsNotEmpty()
  class: string;
}

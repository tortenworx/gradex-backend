import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ClassLinks, Strand } from 'src/schemas/class.schema';

export class CreateClassDto {
  @IsMongoId()
  @IsNotEmpty()
  adviser: string;
  @IsNotEmpty()
  section: string;
  @IsEnum(Strand)
  strand: Strand;
  @IsOptional()
  @IsArray()
  links: [ClassLinks];
}

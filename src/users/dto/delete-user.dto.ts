import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteUserDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}

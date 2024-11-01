import { IsAlphanumeric, IsMongoId, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateCredentialDto {
  @IsNotEmpty()
  @IsMongoId()
  user_id: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  @IsStrongPassword()
  salted_password: string;
}

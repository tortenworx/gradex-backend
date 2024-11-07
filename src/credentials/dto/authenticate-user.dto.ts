import { IsNotEmpty } from 'class-validator';

export class AuthenticateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';
import { Gender, Role } from 'src/schemas/user.schema';

export class UserRecord {
  @Matches(/^(\d{3}[S|C]|OCT)-\d{4,}\w?$/g, {
    message: 'ID Number does not match with Regular Expression Validation',
  })
  id_number: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  middle_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsPhoneNumber('PH')
  mobile_number: number;

  @IsEmail()
  @Matches(/^[A-Za-z0-9._%+-]+@olivarezcollegetagaytay\.edu\.ph$/gi, {
    message:
      'Organizational email addresses must be under the @olivarezcollegetagaytay.edu.ph domain',
  })
  educational_email_address: string;

  @IsEmail()
  @Matches(
    /^[A-Za-z0-9._%+-]+@(?!olivarezcollegetagaytay.edu.ph)[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/gi,
    {
      message:
        'Personal email addresses must not come from @olivarezcollegetagaytay.edu.ph',
    },
  )
  personal_email_address: string;

  @IsNotEmpty()
  @Matches(
    `^${Object.values(Gender)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  gender: Gender;

  @IsNotEmpty()
  @Matches(
    `^${Object.values(Role)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  role: Role;
}

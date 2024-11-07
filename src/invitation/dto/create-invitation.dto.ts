import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateInvitationDto {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  @IsEmail()
  @Matches(
    /^[A-Za-z0-9._%+-]+@(?!olivarezcollegetagaytay.edu.ph)[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/gi,
    {
      message:
        'Personal email addresses must not come from @olivarezcollegetagaytay.edu.ph',
    },
  )
  reciepient_address: string;
}

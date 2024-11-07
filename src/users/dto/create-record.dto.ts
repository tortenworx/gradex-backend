import { UserRecord } from './user-record.dto';
import { CreateCredentialDto } from 'src/credentials/dto/create-credential.dto';
import { IntersectionType, OmitType, PartialType } from '@nestjs/mapped-types';

export class NewUserCredentialsDto extends OmitType(CreateCredentialDto, [
  'user_id',
] as const) {}

export class NewUserDto extends IntersectionType(
  UserRecord,
  PartialType(NewUserCredentialsDto),
) {}

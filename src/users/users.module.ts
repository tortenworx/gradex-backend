import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { CredentialsModule } from '../credentials/credentials.module';
import { Credential, CredentialSchema } from '../schemas/credentials.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Credential.name, schema: CredentialSchema },
    ]),
    CredentialsModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

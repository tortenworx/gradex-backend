import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { CredentialsModule } from 'src/credentials/credentials.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CredentialsModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

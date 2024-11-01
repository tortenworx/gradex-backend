import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Credential } from 'src/schemas/credentials.schema';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Credential.name) private credentialModel: Model<Credential>,
  ) {}
  async create(createCredentialDto: CreateCredentialDto) {
    const user = await this.userModel.findById(createCredentialDto.user_id);
    if (!user) throw new NotFoundException('No user found with designated ID');
  }

  resetPassword() {}

  showUsername() {}

  addMFA() {}

  removeMFA() {}

  // TODO - Fix the damn 'No Overload' bug
  // async checkIfUsernameTaken(username: string): Promise<boolean> {
  //   const user = await this.credentialModel.findOne({ user_name: username });
  //   if (user) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}

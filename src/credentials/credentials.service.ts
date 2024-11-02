import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Credential } from 'src/schemas/credentials.schema';
import * as argon2 from 'argon2';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Credential.name) private credentialModel: Model<Credential>,
  ) {}

  async create(createCredentialDto: CreateCredentialDto): Promise<Credential> {
    const user = await this.userModel.findById(createCredentialDto.user_id);
    if (!user) throw new NotFoundException('No user found with designated ID.');
    if (await this.checkIfUsernameTaken(createCredentialDto.username))
      throw new ForbiddenException('Username already taken.');
    const salted_password = await argon2.hash(createCredentialDto.password);
    const newCredential = await this.credentialModel.create({
      linked_record: user,
      user_name: createCredentialDto.username,
      salted_password,
    });
    return newCredential;
  }

  resetPassword() {}

  showUsername() {}

  addMFA() {}

  removeMFA() {}

  async checkIfUsernameTaken(username: string): Promise<boolean> {
    const user = await this.credentialModel.findOne({ user_name: username });
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}

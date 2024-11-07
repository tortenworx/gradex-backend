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
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CredentialsService {
  constructor(
    private jwtModule: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Credential.name) private credentialModel: Model<Credential>,
  ) {}

  async create(createCredentialDto: CreateCredentialDto): Promise<Credential> {
    const user = await this.userModel.findById(createCredentialDto.user_id);
    if (!user) throw new NotFoundException('No user found with designated ID.');
    if (await this.checkIfUsernameTaken(createCredentialDto.username))
      throw new ForbiddenException('Username already taken.');
    const salted_password = await argon2.hash(createCredentialDto.password);
    // Creates the credential record in the database.
    const newCredential = await this.credentialModel.create({
      linked_record: user,
      user_name: createCredentialDto.username,
      salted_password,
    });
    // Saves a record of the credential on the user record for later reference.
    await this.userModel.findByIdAndUpdate(user.id, {
      credential: newCredential,
    });
    return newCredential;
  }

  async authenticate(
    authenticateUserDto: AuthenticateUserDto,
  ): Promise<object> {
    const credentialSearch = await this.credentialModel.findOne({
      user_name: authenticateUserDto.username,
    });
    if (!credentialSearch) {
      const userSearch = await this.userModel.findOne({
        id_number: authenticateUserDto.username,
      });
      if (!userSearch)
        throw new NotFoundException(
          'No user was found with the following credentials',
        );
      const credential = await this.credentialModel.findById(
        userSearch.credential,
      );
      const passwordVerify = await argon2.verify(
        credential.salted_password,
        authenticateUserDto.password,
      );
      if (!passwordVerify)
        throw new ForbiddenException(
          'Invalid credentials provided. Try again.',
        );
      const jwtToken = await this.jwtModule.signAsync({
        sub: userSearch.id,
        first_name: userSearch.first_name,
        middle_name: userSearch.middle_name,
        last_name: userSearch.last_name,
        role: userSearch.role,
      });
      return {
        access_token: jwtToken,
      };
    }
    const userSearch = await this.userModel.findOne({
      credential: credentialSearch,
    });
    const jwtToken = await this.jwtModule.signAsync({
      sub: userSearch.id,
      first_name: userSearch.first_name,
      last_name: userSearch.last_name,
      role: userSearch.role,
    });
    return {
      access_token: jwtToken,
    };
  }

  resetPassword() {}

  showUsername() {}

  addMFA() {}

  removeMFA() {}

  async getUserThruHeaders(user_id: string): Promise<User> {
    const userObj = await this.userModel
      .findById(user_id)
      .select('-credential');
    if (!userObj)
      throw new NotFoundException(
        'No user was found with provided ID. Contact Support.',
      );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return userObj;
  }

  async checkIfUsernameTaken(username: string): Promise<boolean> {
    const user = await this.credentialModel.findOne({ user_name: username });
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}

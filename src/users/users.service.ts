import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { NewUserDto } from './dto/newRecord.dto';
import { CredentialsService } from 'src/credentials/credentials.service';

@Injectable()
export class UsersService {
  credentialService: CredentialsService;
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create_user(
    newUserDto: NewUserDto,
  ): Promise<any | UnauthorizedException> {
    console.log(newUserDto);
    const { salted_password, username, ...userObject } = newUserDto;
    const userExists = await this.userModel.findOne({
      id_number: userObject.id_number,
    });
    if (userExists)
      throw new UnauthorizedException('User exists with same Record ID');
    const user = new this.userModel({
      ...userObject,
    });
    user.save();
    if (username) {
      const credentials = this.credentialService.create({
        username: username,
        salted_password: salted_password,
        user_id: user.id,
      });
      return { user, credentials };
    }
    return user;
  }
}

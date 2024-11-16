import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { NewUserDto } from './dto/create-record.dto';
import { CredentialsGuard } from '../credentials/credentials.guard';
import { Roles } from '../credentials/decorator/roles.decorator';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  @Post('/create')
  async newUser(@Body(ValidationPipe) newUserDto: NewUserDto): Promise<any> {
    try {
      const user = await this.usersService.create_user(newUserDto);
      return {
        status: 1,
        message:
          'User created successfully, create Invitation to generate Credentials.',
        data: user,
      };
    } catch (error) {
      return {
        status: 1,
        message: 'An error occured.',
        data: error,
      };
    }
  }
  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  @Delete('/delete')
  async deleteUser(deleteUserDto: DeleteUserDto) {
    return await this.usersService.deleteUser(deleteUserDto);
  }
  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  @Get('/list')
  async getUser(@Request() request) {
    return this.usersService.getUsers(request.user.sub);
  }
}

import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { NewUserDto } from './dto/create-record.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
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
}

import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { NewUserDto } from './dto/newRecord.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('/create')
  async newUser(@Body(ValidationPipe) newUserDto: NewUserDto): Promise<any> {
    try {
      const user = await this.usersService.create_user(newUserDto);
      return {
        status: 0,
        message:
          'User created successfully, create Invitation to generate Credentials.',
        data: user,
      };
    } catch (error) {
      return error;
    }
  }
}

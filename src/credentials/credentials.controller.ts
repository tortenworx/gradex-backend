import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { CredentialsGuard } from './credentials.guard';
import { Roles } from './decorator/roles.decorator';
import { User } from 'src/schemas/user.schema';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}
  @Post('register')
  async registerCredential(
    @Body() createCredentialDto: CreateCredentialDto,
  ): Promise<object> {
    return this.credentialsService.create(createCredentialDto);
  }
  @Get('username-taken/:username')
  async usernameTaken(@Param('username') username: string): Promise<boolean> {
    return await this.credentialsService.checkIfUsernameTaken(username);
  }
  @Post('authenticate')
  async authenticateUser(
    @Body() authenticateUserDto: AuthenticateUserDto,
  ): Promise<object> {
    return await this.credentialsService.authenticate(authenticateUserDto);
  }
  @Get('user')
  @Roles(['USER', 'FACULTY', 'SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  async getAuthenticatedUser(@Request() request): Promise<User> {
    return this.credentialsService.getUserThruHeaders(request.user.sub);
  }
}

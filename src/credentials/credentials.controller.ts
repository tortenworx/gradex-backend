import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';

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
}

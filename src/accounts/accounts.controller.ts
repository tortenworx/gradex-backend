import { Controller, Post } from '@nestjs/common';
import {} from '../app.service';

@Controller('accounts')
export class AccountsController {
  @Post('signon')
  signInUser(): string {
    return 'tite';
  }
}

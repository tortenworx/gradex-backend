import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { CredentialsGuard } from 'src/credentials/credentials.guard';
import { Roles } from 'src/credentials/decorator/roles.decorator';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  @Post('/send')
  async sendInvitation(
    @Body() createInvitationDto: CreateInvitationDto,
  ): Promise<object> {
    return await this.invitationService.createInvitation(createInvitationDto);
  }
}

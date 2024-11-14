import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { CredentialsGuard } from '../credentials/credentials.guard';
import { Roles } from '../credentials/decorator/roles.decorator';
import { ResendInvitationDto } from './dto/resend-invitation.dto';

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
  @Post('/resend')
  async resendInvitation(
    resendInvitationDto: ResendInvitationDto,
  ): Promise<object> {
    return await this.invitationService.resendInvitation(resendInvitationDto);
  }
}

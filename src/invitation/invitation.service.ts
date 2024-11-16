import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { ResendInvitationDto } from './dto/resend-invitation.dto';
@Injectable()
export class InvitationService {
  constructor(
    private jwtModule: JwtService,
    private mailerService: MailerService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createInvitation(createInvitationDto: CreateInvitationDto) {
    const user = await this.userModel.findById(createInvitationDto.userId);
    if (!user)
      throw new BadRequestException('No User was found with provided User ID');
    const token = await this.jwtModule.signAsync(
      {
        sub: user.id,
        id_number: user.id_number,
        first_name: user.first_name,
      },
      {
        expiresIn: '30d',
      },
    );
    const invitation_url = 'http://localhost:8000/invitation/' + token;
    try {
      this.mailerService.sendMail({
        to: createInvitationDto.reciepient_address,
        from: 'GradeX <gradex-noreply@mail-distribution.torten.xyz>',
        subject: '[GradeX] Finish your account',
        text:
          'Your account is nearly ready, create your log-in credentials using this link: ' +
          invitation_url,
        template: 'invitation',
        context: {
          first_name: user.first_name,
          invitation_link: invitation_url,
        },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occured while proccessing your request. Server administrators has been notified.',
      );
    }
    return {
      message: 'Invitation sent successfully.',
    };
  }
  async resendInvitation(resendInvitationDto: ResendInvitationDto) {
    const user = await this.userModel.findOne({
      $and: [
        {
          id_number: resendInvitationDto.id_number,
          last_name: resendInvitationDto.last_name,
        },
      ],
    });
    if (!user)
      throw new NotFoundException('No user was found with the selected query.');
    const token = await this.jwtModule.signAsync(
      {
        sub: user.id,
        id_number: user.id_number,
        first_name: user.first_name,
      },
      {
        expiresIn: '30d',
      },
    );
    const invitation_url = 'http://localhost:8000/invitation/' + token;
    try {
      this.mailerService.sendMail({
        to: user.educational_email_address,
        from: 'GradeX <gradex-noreply@mail-distribution.torten.xyz>',
        subject: '[GradeX] Finish your account',
        text:
          'Your account is nearly ready, create your log-in credentials using this link: ' +
          invitation_url,
        template: 'invitation',
        context: {
          first_name: user.first_name,
          invitation_link: invitation_url,
        },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occured while proccessing your request. Server administrators has been notified.',
      );
    }
    return {
      message: "Invitation sent successfully to user's school email address.",
    };
  }
}

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { sendInvitation } from 'src/utils/mailer';

@Injectable()
export class InvitationService {
  constructor(
    private jwtModule: JwtService,
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
      await sendInvitation(
        user.first_name,
        createInvitationDto.reciepient_address,
        invitation_url,
      );
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
}

import { Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Roles } from 'src/credentials/decorator/roles.decorator';
import { CredentialsGuard } from 'src/credentials/credentials.guard';
import { CreateClassDto } from './dto/create-class.dto';
import { AddUserToClassDto } from './dto/add-user-to-class.dto';
import { Class } from 'src/schemas/class.schema';
import { AttachSubjectToClassDto } from './dto/attach-subject.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}
  @Post('/create-class')
  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  async createClass(createClassDto: CreateClassDto) {
    return this.classesService.createClass(createClassDto);
  }
  @Put('/add-user-to-class')
  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  async attachStudentToClass(
    addUserToClassDto: AddUserToClassDto,
  ): Promise<Class> {
    return await this.classesService.attachUserToClass(addUserToClassDto);
  }
  @Put('/add-subject-to-class')
  @Roles(['SUPERADMIN'])
  @UseGuards(CredentialsGuard)
  async attachSubjectToClass(
    addSubjectToClass: AttachSubjectToClassDto,
  ): Promise<Class> {
    return await this.classesService.attachSubjectToClass(addSubjectToClass);
  }
}

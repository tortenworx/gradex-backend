import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CredentialsModule } from './credentials/credentials.module';
import { ClassesModule } from './classes/classes.module';
import { GradesModule } from './grades/grades.module';
import { SubjectsModule } from './subjects/subjects.module';
import { InvitationModule } from './invitation/invitation.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3h' },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SES_EMAIL_HOST,
        port: process.env.SES_EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.SES_EMAIL_USERNAME,
          pass: process.env.SES_EMAIL_PASSWORD,
        },
      },
      template: {
        dir: process.cwd() + '/src/utils/mailer/templates',
        adapter: new HandlebarsAdapter(),
      },
    }),
    UsersModule,
    CredentialsModule,
    ClassesModule,
    GradesModule,
    SubjectsModule,
    InvitationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

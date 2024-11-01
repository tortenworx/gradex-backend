import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { CredentialsModule } from './credentials/credentials.module';
import { ClassesModule } from './classes/classes.module';
import { GradesModule } from './grades/grades.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MongooseModule.forRoot(process.env.DATABASE_URI, {
      tls: true,
      tlsCertificateKeyFile: resolve('secrets', 'mongocert.pem'),
      authMechanism: 'MONGODB-X509',
      authSource: '$external',
    }),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    CredentialsModule,
    ClassesModule,
    GradesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

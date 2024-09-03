import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsModule } from './accounts/accounts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AccountsModule,
    MongooseModule.forRoot(process.env.DATABASE_URI, {
      tls: true,
      tlsCertificateKeyFile: resolve('secrets', 'mongocert.pem'),
      authMechanism: 'MONGODB-X509',
      authSource: '$external'
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

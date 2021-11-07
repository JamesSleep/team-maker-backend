import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import * as path from 'path';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './character/character.module';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
import { RaidersModule } from './raiders/raiders.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'team-maker.cdau3unj8yg3.us-east-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'ehdgk123',
      database: 'teammaker',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        service: 'Naver',
        host: 'smtp.naver.com',
        port: 587,
        auth: {
          user: process.env.AUTH_USER,
          pass: process.env.AUTH_PASS
        }
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new EjsAdapter(),
        options: {
          strict: true
        }
      }
    }),
    UserModule,
    CharacterModule,
    TeamModule,
    RaidersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private readonly connection: Connection) { }
}


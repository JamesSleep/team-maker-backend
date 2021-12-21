import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entity/team.entity';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { Raiders } from 'src/raiders/entity/raiders.entity';
import { RaidersService } from 'src/raiders/raiders.service';
import { RaidService } from 'src/raid/raid.service';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), TypeOrmModule.forFeature([Raiders]), TypeOrmModule.forFeature([User])],
  controllers: [TeamController],
  providers: [TeamService, RaidersService, UserService],
})
export class TeamModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Raiders } from './entity/raiders.entity';
import { RaidersController } from './raiders.controller';
import { RaidersService } from './raiders.service';
import { UserService } from 'src/users/user.service';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Raiders]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [RaidersController],
  providers: [RaidersService, UserService],
})
export class RaidersModule {}

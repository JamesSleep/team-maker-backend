import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Raiders } from './entity/raiders.entity';
import { RaidersController } from './raiders.controller';
import { RaidersService } from './raiders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Raiders])],
  controllers: [RaidersController],
  providers: [RaidersService],
})
export class RaidersModule { }

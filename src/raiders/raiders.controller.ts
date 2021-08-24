import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Raiders } from './entity/raiders.entity';
import { RaidersService } from './raiders.service';

@Controller('raiders')
export class RaidersController {
  constructor(private readonly raidersService: RaidersService) { }

  @Post('make')
  create(@Body() raidersData: Raiders) {
    return this.raidersService.register(raidersData);
  }

  @Get()
  getAllRaiders(): Promise<Raiders[]> {
    return this.raidersService.getAllRaiders();
  }

  @Get(':index')
  getOneTeam(@Param('index') index: number): Promise<Raiders> {
    return this.raidersService.getOneTeam(index);
  }

  @Get(':index')
  getOneCharacter(@Param('index') index: number): Promise<Raiders> {
    return this.raidersService.getOneCharacter(index);
  }
}

import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Raiders } from './entity/raiders.entity';
import { RaidersService } from './raiders.service';
import { ResponseData } from 'src/common/response.entity';

@Controller('raiders')
export class RaidersController {
  constructor(private readonly raidersService: RaidersService) { }

  @Post('make')
  async create(@Body() raidersData: Raiders): Promise<ResponseData> {
    const result = this.raidersService.register(raidersData);
    return { success: true, data: null }
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

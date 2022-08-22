import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Raiders } from './entity/raiders.entity';
import { RaidersService } from './raiders.service';
import { ResponseData } from 'src/common/response.entity';
import { UserService } from 'src/users/user.service';

@Controller('raiders')
export class RaidersController {
  constructor(
    private readonly raidersService: RaidersService,
    private readonly userService: UserService,
  ) {}

  @Post('make')
  async create(@Body() raidersData: Raiders): Promise<ResponseData> {
    const result = this.raidersService.register(raidersData);
    return { success: true, data: null };
  }

  @Get()
  async getAllRaiders(): Promise<ResponseData> {
    const raiders = await this.raidersService.getAllRaiders();
    return { success: true, data: raiders };
  }

  /* @Get(':index')
  async getOneTeam(@Param('index') index: number): Promise<ResponseData> {
    let array = [];
    const raiders = await this.raidersService.getOneTeam(index);
    for (let i = 0; i < raiders.length; i++) {
      let user = { userInfo: {}, raidInfo: {} };
      user.userInfo = await this.userService.getOneUserForIndex(
        raiders[i].member_index,
      );
      user.raidInfo = raiders[i];
      array.push(user);
    }
    return { success: true, data: array };
  } */

  @Get('delete/:index')
  async removeRaider(@Param('index') index: number): Promise<ResponseData> {
    await this.raidersService.remove(index);
    return { success: true, data: null };
  }
}

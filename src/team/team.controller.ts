import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Team } from './entity/team.entity';
import { TeamService } from './team.service';
import { ResponseData } from 'src/common/response.entity';
import { ErrorCode } from 'src/common/errorCode';
import { RaidersService } from 'src/raiders/raiders.service';
import { UserService } from 'src/users/user.service';

@Controller('team')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly raidersService: RaidersService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getAllTeam(): Promise<ResponseData> {
    const team = await this.teamService.getAllTeam();
    if (team.length > 0) {
      return { success: true, data: team };
    } else {
      return { success: false, data: null };
    }
  }

  @Get('findTeam/:index')
  async getOneTeam(@Param('index') index: number): Promise<ResponseData> {
    const team = await this.teamService.getOneTeam(index);
    if (team) {
      return { success: true, data: team };
    } else {
      return { success: false, data: ErrorCode[201] };
    }
  }

  @Get('findTeamByMan/:index')
  async getAllTeamByMan(@Param('index') index: number): Promise<ResponseData> {
    const teamList = await this.teamService.getAllTeam();
    let array = [];

    for (let i = 0; i < teamList.length; i++) {
      const raiders = await this.raidersService.getOneTeam(teamList[i].index);
      for (let j = 0; j < raiders.length; j++) {
        if (raiders[j].member_index === Number(index)) {
          array.push(teamList[i]);
        }
      }
    }

    return { success: true, data: array };
  }

  @Post('make')
  async create(@Body() teamData: Team): Promise<ResponseData> {
    const result = await this.teamService.create(teamData);
    const team = await this.teamService.getOneTeamTitle(teamData.title);
    if (result) {
      return { success: true, data: team };
    }
  }

  @Get('remove/:index')
  async delete(@Param('index') index: number): Promise<ResponseData> {
    await this.teamService.remove(index);
    return { success: true, data: null };
  }
}

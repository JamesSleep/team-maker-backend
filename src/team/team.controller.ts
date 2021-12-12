import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Team } from './entity/team.entity';
import { TeamService } from './team.service';
import { ResponseData } from 'src/common/response.entity';
import { ErrorCode } from 'src/common/errorCode';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) { }

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

  @Post('make')
  async create(@Body() teamData: Team): Promise<ResponseData> {
    const result = await this.teamService.create(teamData);
    const team = await this.teamService.getOneTeamTitle(teamData.title);
    if (result) {
      return { success: true, data: team };
    }
  }
}

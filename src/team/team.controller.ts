import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Team } from './entity/team.entity';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) { }

  @Post('make')
  create(@Body() teamData: Team) {
    return this.teamService.create(teamData);
  }

  @Get()
  getAllTeam(): Promise<Team[]> {
    return this.teamService.getAllTeam();
  }

  @Get(':index')
  getOneTeam(@Param('index') index: number): Promise<Team> {
    return this.teamService.getOneTeam(index);
  }
}

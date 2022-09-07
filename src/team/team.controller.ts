import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';
import { TeamService } from './team.service';

@UseGuards(JwtAuthGuard)
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async getAllTeams() {
    return await this.teamService.getAllTeams();
  }

  @Get('/:id')
  async getOneTeam(@Param('id') id: number) {
    return await this.teamService.getOneTeam(id);
  }

  @Post()
  async createTeam(@Body() body: CreateTeamDto) {
    return await this.teamService.create(body);
  }

  @Patch('/:id')
  async updateTeam(@Param('id') id: number, @Body() body: UpdateTeamDto) {
    return await this.teamService.modify(id, body);
  }

  @Delete('/:id')
  async deleteTeam(@Param('id') id: number) {
    return await this.deleteTeam(id);
  }
}

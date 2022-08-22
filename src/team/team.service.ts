import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamService {
  constructor(private readonly teamRepository: TeamRepository) {}

  async getAllTeams() {
    return await this.teamRepository.find();
  }

  async getOneTeam(id: number) {
    return await this.teamRepository.findOne({ where: { id } });
  }

  async create(body: CreateTeamDto) {
    const { name, member } = body;

    const isTeam = await this.teamRepository.findOne({ where: { name } });

    if (isTeam) {
      throw new BadRequestException('이미 존재하는 팀명입니다.');
    }

    return await this.teamRepository.save({ name, leader: member, member });
  }

  async modify(id: number, body: UpdateTeamDto) {
    return await this.teamRepository.save({ id, ...body });
  }

  async remove(id: number) {
    return await this.teamRepository.softDelete(id);
  }
}

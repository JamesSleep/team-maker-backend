import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entity/team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>
  ) { }

  async getAllTeam(): Promise<Team[]> {
    return await this.teamRepository.find();
  }

  async getOneTeam(index: number): Promise<Team> {
    return await this.teamRepository.findOne({
      where: {
        index: index
      }
    });
  }

  async create(teamData: Team): Promise<boolean> {
    const addTeam = await this.teamRepository.create();
    addTeam.title = teamData.title;
    addTeam.leader = teamData.leader;
    addTeam.start_date = teamData.start_date;
    addTeam.type = teamData.type;
    addTeam.description = teamData.description;

    await this.teamRepository.save(addTeam);

    return true;
  }
}

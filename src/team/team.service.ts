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
    return await this.teamRepository.find({
      order: {
        timestamp: "DESC"
      }
    });
  }

  async getOneTeam(index: number): Promise<Team> {
    return await this.teamRepository.findOne({
      where: {
        index: index
      },
    });
  }

  async getOneTeamTitle(title: string): Promise<Team> {
    return await this.teamRepository.findOne({
      where: {
        title: title
      }
    })
  }

  async create(teamData: Team): Promise<boolean> {
    const addTeam = await this.teamRepository.create();
    addTeam.title = teamData.title;
    addTeam.leader = teamData.leader;
    addTeam.start_date = teamData.start_date;
    addTeam.type = teamData.type;
    addTeam.description = teamData.description;
    addTeam.time = teamData.time;
    addTeam.level = teamData.level;
    addTeam.timestamp = teamData.timestamp;

    await this.teamRepository.save(addTeam);

    return true;
  }

  async remove(index: number): Promise<boolean> {
    await this.teamRepository.delete({ index: index });
    return true;
  }
}

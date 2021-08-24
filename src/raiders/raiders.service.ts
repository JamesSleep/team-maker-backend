import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Raiders } from './entity/raiders.entity';

@Injectable()
export class RaidersService {
  constructor(
    @InjectRepository(Raiders)
    private readonly raidersRepository: Repository<Raiders>
  ) { }

  async getAllRaiders(): Promise<Raiders[]> {
    return await this.raidersRepository.find();
  }

  async getOneTeam(team_index: number): Promise<Raiders> {
    return await this.raidersRepository.findOne({
      where: {
        team_index: team_index
      }
    });
  }

  async getOneCharacter(char_index: number): Promise<Raiders> {
    return await this.raidersRepository.findOne({
      where: {
        char_index: char_index
      }
    });
  }

  async register(raidersData: Raiders): Promise<boolean> {
    const addRaiders = await this.raidersRepository.create();
    addRaiders.char_index = raidersData.char_index;
    addRaiders.team_index = raidersData.team_index;

    await this.raidersRepository.save(addRaiders);

    return true;
  }
}

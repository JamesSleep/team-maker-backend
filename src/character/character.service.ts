import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './entity/character.entity';
import * as Bcrypt from 'bcryptjs';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>
  ) { }

  async getAllCharacter(): Promise<Character[]> {
    return await this.characterRepository.find();
  }

  async getOneCharacter(nickname: string): Promise<Character> {
    return await this.characterRepository.findOne({
      where: {
        nickname: nickname
      }
    });
  }

  async getAllforOne(user_idx: number): Promise<Character[]> {
    return await this.characterRepository.find({ member_index: user_idx })
  }

  async create(charData: Character): Promise<boolean> {
    const addCharacter = await this.characterRepository.create();
    addCharacter.nickname = charData.nickname;
    addCharacter.class = charData.class;
    addCharacter.memo = charData.memo;
    addCharacter.member_index = charData.member_index;

    await this.characterRepository.save(addCharacter);

    return true;
  }
}

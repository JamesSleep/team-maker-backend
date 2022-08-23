import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { CharacterRepository } from './character.repository';
import { CreateCharacterDto, UpdateCharacterDto } from './dto/character.dto';

@Injectable()
export class CharacterService {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async getAllCharacters() {
    return await this.characterRepository.find();
  }

  async getOneCharacter(id: number) {
    return await this.characterRepository.findOne({ where: { id } });
  }

  async getByUser(user: User) {
    return await this.characterRepository.find({ where: { user } });
  }

  async create(body: CreateCharacterDto) {
    return await this.characterRepository.save(body);
  }

  async modify(id: number, body: UpdateCharacterDto) {
    return await this.characterRepository.save({ id, ...body });
  }

  async remove(id: number) {
    return await this.characterRepository.delete(id);
  }
}

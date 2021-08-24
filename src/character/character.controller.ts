import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Character } from './entity/character.entity';
import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) { }

  @Post('make')
  create(@Body() charData: Character) {
    return this.characterService.create(charData);
  }

  @Get()
  getAllCharacter(): Promise<Character[]> {
    return this.characterService.getAllCharacter();
  }

  @Get(':nickname')
  getOneCharacter(@Param('nickname') nickname: string): Promise<Character> {
    return this.characterService.getOneCharacter(nickname);
  }

  @Get(':index')
  getAllforOne(@Param('index') index: number): Promise<Character[]> {
    return this.characterService.getAllforOne(index);
  }
}

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
import { CurrentUser } from 'src/common/decorators/user.decorators';
import { User } from 'src/users/user.entity';
import { CharacterService } from './character.service';
import { CreateCharacterDto, UpdateCharacterDto } from './dto/character.dto';

@UseGuards(JwtAuthGuard)
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  async getAllCharacters() {
    return await this.characterService.getAllCharacters();
  }

  @Get('user')
  async getAllCharactersByUser(@CurrentUser() user: User) {
    return await this.characterService.getByUser(user);
  }

  @Get('/:id')
  async getOneCharacter(@Param('id') id: number) {
    return await this.characterService.getOneCharacter(id);
  }

  @Post()
  async createCharacter(@Body() body: CreateCharacterDto) {
    return await this.characterService.create(body);
  }

  @Patch('/:id')
  async updateCharacter(
    @Param('id') id: number,
    @Body() body: UpdateCharacterDto,
  ) {
    return await this.characterService.modify(id, body);
  }

  @Delete('/:id')
  async deleteCharacter(@Param('id') id: number) {
    return await this.characterService.remove(id);
  }
}

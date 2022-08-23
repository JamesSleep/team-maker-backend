import { PickType } from '@nestjs/swagger';
import { Character } from '../character.entity';

export class CreateCharacterDto extends PickType(Character, [
  'nickname',
  'class',
  'itemLevel',
] as const) {}

export class UpdateCharacterDto extends PickType(Character, [
  'nickname',
  'class',
  'itemLevel',
] as const) {}

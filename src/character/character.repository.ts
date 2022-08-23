import { Repository } from 'typeorm';
import { Character } from './character.entity';

export class CharacterRepository extends Repository<Character> {}

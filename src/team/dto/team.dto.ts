import { PickType } from '@nestjs/swagger';
import { Team } from '../team.entity';

export class CreateTeamDto extends PickType(Team, [
  'name',
  'member',
] as const) {}

export class UpdateTeamDto extends PickType(Team, ['leader'] as const) {}

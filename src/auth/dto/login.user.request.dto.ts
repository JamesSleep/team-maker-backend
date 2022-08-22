import { PickType } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

export class LoginUserRequestDto extends PickType(User, [
  'email',
  'password',
] as const) {}

import { PickType } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UpdateUserDto extends PickType(User, ['nickname', 'team']) {}

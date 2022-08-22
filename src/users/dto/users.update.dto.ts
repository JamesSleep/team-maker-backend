import { PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from '../user.entity';

export class UpdateUserDto extends PickType(User, ['nickname']) {
  @IsNotEmpty({ message: '팀명을 입력해주세요.' })
  team: string;
}

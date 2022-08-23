import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'characters' })
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.character)
  user: User;

  @IsNotEmpty({ message: '캐릭터 이름을 입력해주세요.' })
  @Column({ unique: true })
  nickname: string;

  @IsNotEmpty({ message: '직업을 선택해주세요.' })
  @Column()
  class: string;

  @IsNotEmpty({ message: '아이템 레벨을 입력해주세요.' })
  @Column()
  itemLevel: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

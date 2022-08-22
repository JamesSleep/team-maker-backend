import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'teams' })
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: '팀장을 입력해주세요.' })
  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  leader: User;

  @IsNotEmpty({ message: '사용자가 없습니다.' })
  @OneToMany(() => User, (user) => user.team, {})
  member: User;

  @IsNotEmpty({ message: '팀명을 입력해주세요.' })
  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

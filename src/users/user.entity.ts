import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Team } from 'src/team/team.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, (team) => team.member, {
    cascade: ['insert', 'remove', 'update'],
  })
  team: string;

  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  @Column({ length: 100, unique: true })
  email: string;

  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @Column({ nullable: false })
  password: string;

  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  @Column({ nullable: false })
  nickname: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  @Column({ length: 100, unique: true })
  email: string;

  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @Column({ nullable: false })
  password: string;

  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  @Column({ nullable: false })
  nickname: string;

  @IsNotEmpty({ message: '팀명을 입력해주세요.' })
  @Column({ nullable: true })
  team: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

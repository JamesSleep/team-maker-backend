import { IsNotEmpty } from 'class-validator';
import { Character } from 'src/character/character.entity';
import { Contents } from 'src/contents/contents.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'raid' })
export class Raid {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Contents)
  @JoinColumn()
  contents: Contents;

  @ManyToMany(() => Character)
  @JoinTable()
  character: Character;

  @ManyToOne(() => User)
  @JoinColumn()
  raidLeader: User;

  @IsNotEmpty({ message: '제목을 입력해주세요.' })
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @IsNotEmpty({ message: '시작날짜를 입력해주세요.' })
  @Column({ nullable: false })
  startDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

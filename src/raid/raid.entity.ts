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

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

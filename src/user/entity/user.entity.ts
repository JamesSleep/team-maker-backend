import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "member", schema: "teammaker" })
//@Index(['email'])
export class User {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({ length: 45, unique: false })
  email: string;

  @Column({ length: 100, nullable: false })
  password: string;

  @Column({ length: 100, nullable: false })
  salt: string;

  @Column({ length: 45, nullable: false })
  nickname: string;

  @Column({ length: 45, nullable: true })
  guild: string;

  @Column({ length: 100, nullable: true })
  auth_token: string;

  @Column({ length: 100, nullable: true })
  timestamp: string;
}

export type Login = {
  email: string;
  password: string;
}

export type Question = {
  email: string;
  title: string;
  content: string;
}
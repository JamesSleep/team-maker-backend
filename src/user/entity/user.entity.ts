import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "member", schema: "teammaker" })
//@Index(['email'])
export class User {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({ length: 45, unique: true })
  email: string;

  @Column({ length: 100, nullable: false })
  password: string;

  @Column({ length: 100, nullable: false })
  salt: string;

  @Column({ length: 45, nullable: true })
  guild: string;

  @Column({ length: 100, nullable: true })
  auth_token: string;

  @Column({ nullable: true })
  timestamp: number;
}

export type Login = {
  email: string;
  password: string;
}
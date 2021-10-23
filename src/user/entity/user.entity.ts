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

  @Column({ length: 45, nullable: false })
  guild: string;
}

export type Login = {
  email: string;
  password: string;
}
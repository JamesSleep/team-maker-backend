import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "character", schema: "teammaker" })
//@Index(['email'])
export class Character {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({ length: 45, unique: false })
  nickname: string;

  @Column({ length: 45, nullable: false })
  class: string;

  @Column({ length: 45, nullable: true })
  memo: string;

  @Column({ nullable: false })
  member_index: number;
}
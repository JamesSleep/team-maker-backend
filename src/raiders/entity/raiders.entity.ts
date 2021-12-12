import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "raiders", schema: "teammaker" })

export class Raiders {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({ unique: false })
  member_index: number;

  @Column({ nullable: false })
  team_index: number;

  @Column({ length: 45, nullable: false })
  char_name: string;

  @Column({ length: 45, nullable: false })
  class: string;
}
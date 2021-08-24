import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "raiders", schema: "teammaker" })

export class Raiders {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({ unique: false })
  char_index: number;

  @Column({ nullable: false })
  team_index: number;
}
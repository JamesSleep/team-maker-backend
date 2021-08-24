import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "team", schema: "teammaker" })

export class Team {
  @PrimaryGeneratedColumn()
  index: number;

  @Column({ length: 45, unique: false })
  title: string;

  @Column({ length: 45, nullable: false })
  type: string;

  @Column({ length: 45, nullable: false })
  start_date: string;

  @Column({ length: 45, nullable: false })
  leader: string;

  @Column({ length: 45, nullable: true })
  description: string;
}
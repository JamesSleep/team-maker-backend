import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "teamlist", schema: "teammaker" })

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
  time: string;

  @Column({ length: 45, nullable: false })
  leader: string;

  @Column({ length: 45, nullable: true })
  description: string;

  @Column({ length: 45, nullable: false })
  level: string;

  @Column({ length: 100, nullable: false })
  timestamp: string;
}
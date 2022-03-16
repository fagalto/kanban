import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export default class Kanban_kanban {
  @PrimaryGeneratedColumn()
  kanban_id!: number;
  @Column()
  name!: string;
  @Column()
  notes!: string;
  @Column()
  active!: boolean;
  @Column()
  slot_x!: number;
  @Column()
  slot_y!: number;
}

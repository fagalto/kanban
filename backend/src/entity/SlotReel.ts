import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class KANBAN_Slot_Reels {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  slot_id!: number;
  @Column()
  reel_id!: string;
}

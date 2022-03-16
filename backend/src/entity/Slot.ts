import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export default class KANBAN_Slot_Details {
  @PrimaryGeneratedColumn()
  slot_id!: number;
  @Column()
  kanban_id!: number;
  @Column()
  slot_coord!: string;
  @Column()
  itemid!: string;
  @Column()
  req_capacity!: number;
  @Column()
  do_not_refill!: boolean;
  @Column()
  notes!: string;
 // @Column()
 // balance!: number;
}

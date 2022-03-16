import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class KANBAN_Slot_Static {
  @PrimaryGeneratedColumn()
  static_id!: number;
  @Column()
  slot_id!: number;
  @Column()
  balance!: number;
  @Column()
  state_20!: string;
  @Column()
  date_state_20!: string;
  @Column()
  del_date!: string;
  @Column()
  date_chk_del_date!: string;
  @Column()
  req_date!: string;
  @Column()
  date_check_req_date!: string;
}

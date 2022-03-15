import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class AS_REELTABLE {
  @PrimaryGeneratedColumn()
  REELID: number;
  @Column()
  QTY: number;
  @Column()
  ITEMID: string;
}

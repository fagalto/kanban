import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class AS_REELTABLE {
  @PrimaryGeneratedColumn()
  REELID!: string;
  @Column()
  QTY!: number;
  @Column()
  ITEMID!: string;
}

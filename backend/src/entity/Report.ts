import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export default class LackReport {
  @PrimaryColumn()
  itemid!: string;
  @Column()
  lackingReelsNo!: number;
  @Column()
  wh20stock!: string;
  @Column()
  deliveryDate!: string;
  @Column()
  requiredDate!: string;
}

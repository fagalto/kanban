import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export default class InventSumAVAILPHYSICAL {
  @PrimaryColumn()
  ITEMID!: string;
  @Column()
  "Fizycznie dostępne"!: number;
  @Column()
  Magazyn!: number;
}

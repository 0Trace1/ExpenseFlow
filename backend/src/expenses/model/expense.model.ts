import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Expense extends Model {
  @Column
  amount: number;

  @Column
  category: string;

  @Column
  description: string;

  @Column
  date: Date;
}

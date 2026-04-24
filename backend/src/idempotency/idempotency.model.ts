import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';
import { Expense } from 'src/expenses/model/expense.model';

@Table
export class Idempotency extends Model {
  @PrimaryKey
  @Column
  key: string;

  @Column(DataType.JSON)
  response: Partial<Expense>;

  @Column
  created_at: Date;
}

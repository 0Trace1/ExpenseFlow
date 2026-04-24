import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsDateString,
} from 'class-validator';

export class ExpenseDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  category: string;

  description: string;

  @IsDateString()
  date: string;
}

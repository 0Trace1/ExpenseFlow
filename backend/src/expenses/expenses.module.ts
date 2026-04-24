import { Logger, Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { Idempotency } from 'src/idempotency/idempotency.model';
import { Expense } from './model/expense.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Expense, Idempotency])],
  controllers: [ExpensesController],
  providers: [ExpensesService, Logger],
})
export class ExpensesModule {}

import { Controller, Post, Body, Headers, Get, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpenseDto } from './dto/expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get('get_expenses')
  async allExpense(
    @Query('category') category?: string,
    @Query('sort') sort?: string,
  ) {
    return await this.expensesService.findAll(category, sort);
  }

  @Post('create_expense')
  async create(
    @Body() expenseDto: ExpenseDto,
    @Headers('idempotency-key') idempotency_key: string,
  ) {
    return await this.expensesService.create(expenseDto, idempotency_key);
  }
}

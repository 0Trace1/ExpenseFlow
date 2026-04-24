import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ExpenseDto } from './dto/expense.dto';
import { Idempotency } from 'src/idempotency/idempotency.model';
import { InjectModel } from '@nestjs/sequelize';
import { Expense } from './model/expense.model';
import { Order } from 'sequelize';

@Injectable()
export class ExpensesService {
  private logger: Logger;
  constructor(
    @InjectModel(Idempotency)
    private readonly idempotency: typeof Idempotency,
    @InjectModel(Expense)
    private readonly expenseModel: typeof Expense,
  ) {
    this.logger = new Logger(ExpensesService.name);
  }

  async create(
    expenseDto: ExpenseDto,
    idempotencyKey: string,
  ): Promise<Expense> {
    if (!idempotencyKey) {
      throw new BadRequestException('Idempotency-Key header is required');
    }

    try {
      const existing = await this.idempotency.findByPk(idempotencyKey);

      if (existing) {
        this.logger.log(
          `Returning cached response for idempotency key: ${idempotencyKey}`,
        );
        return existing.response as Expense;
      }

      const expense = await this.expenseModel.create({
        ...expenseDto,
        date: new Date(expenseDto.date),
      });

      await this.idempotency.create({
        key: idempotencyKey,
        response: expense.toJSON(),
      });

      return expense;
    } catch (error) {
      this.logger.error(
        `Failed to create expense (idempotencyKey=${idempotencyKey})`,
        error,
      );

      throw error;
    }
  }

  async findAll(category?: string, sort?: string) {
    try {
      const where = category ? { category } : undefined;

      const order: Order =
        sort === 'date_desc' ? [['date', 'DESC']] : [['createdAt', 'DESC']];

      return await this.expenseModel.findAll({ where, order });
    } catch (error) {
      this.logger.error('Failed to fetch expenses', error);
      throw error;
    }
  }
}

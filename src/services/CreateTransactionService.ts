// import AppError from '../errors/AppError';
import { getRepository, getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const transactionCustomRepository = getCustomRepository(
      TransactionsRepository,
    );

    const balance = await transactionCustomRepository.getBalance();

    if (type === 'outcome' && value > balance.total) {
      throw new Error('The outcome is over your balance');
    }

    const CategoriesRepository = getRepository(Category);

    const categoryReturned = await CategoriesRepository.findOne({
      where: { title: category },
    });

    if (!categoryReturned) {
      const categoryCreated = CategoriesRepository.create({
        title: category,
      });

      await CategoriesRepository.save(categoryCreated);
    }

    const newCategoryReturned = await CategoriesRepository.findOne({
      where: { title: category },
    });

    const category_id = newCategoryReturned?.id;

    const transactionsRepository = getRepository(Transaction);

    const transaction = transactionsRepository.create({
      title,
      type,
      value,
      category_id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;

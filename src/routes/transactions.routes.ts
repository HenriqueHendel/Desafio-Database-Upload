import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const balance = await transactionsRepository.getBalance();
  const transactions = await transactionsRepository.find();

  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  try {
    const { title, value, type, category } = request.body;

    const TransictionService = new CreateTransactionService();

    const transaction = await TransictionService.execute({
      title,
      value,
      type,
      category,
    });

    return response.json(transaction);
  } catch (error) {
    return response
      .status(400)
      .json({ message: error.message, status: 'error' });
  }
});

transactionsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const DeleteTransaction = new DeleteTransactionService();

    await DeleteTransaction.execute(id);

    return response.status(400).json({ message: 'Transaction deleted.' });
  } catch (error) {
    return response.status(400).json({ error });
  }
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;

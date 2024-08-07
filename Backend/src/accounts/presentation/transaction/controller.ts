import { Request, Response } from "express";

import { CreateTransaction, CreateTransactionDto, GetAllTransactions, GetTransaction, TransactionRepository, UpdateTransaction, UpdateTransactionDto, ValidateTransactionIdDto } from "../../domain";
import { CustomError } from "../../../auth/domain";

export class TransactionController {
  constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.code).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  };

  

  createTransaction = (req: Request, res: Response) => {
    const userId = req.user!;

    const [error, createTransactionDto] = CreateTransactionDto.create(req.body);
    if (error) return res.status(400).json({ error });

    return new CreateTransaction(this.transactionRepository)
      .execute(createTransactionDto!, userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }



  getAllTransactions = async (req: Request, res: Response) => {
    const userId = req.user!;

    return new GetAllTransactions(this.transactionRepository)
      .execute(userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }



  getTransactionById = async (req: Request, res: Response) => {
    const userId = req.user!;
    const transactionId = req.params.transactionId;

    const [error, validateTransactionIdDto] = ValidateTransactionIdDto.create(transactionId);
    if (error) return res.status(400).json({ error });

    return new GetTransaction(this.transactionRepository)
      .execute(validateTransactionIdDto!.transactionId, userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }



  updateTransaction = async (req: Request, res: Response) => {
    const userId = req.user!;
    const transactionId = req.params.transactionId;

    const [error, updateTransactionDto] = UpdateTransactionDto.create(req.body, transactionId);
    if (error) return res.status(400).json({ error });

    return new UpdateTransaction(this.transactionRepository)
      .execute(updateTransactionDto!, userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }
}
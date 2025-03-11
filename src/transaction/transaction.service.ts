import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/CreateTransationDto';
import { UpdateTransactionDto } from './dto/UpdateTransactionDto';
import { StorageService } from 'src/storage/storage.service';
import { Response } from 'express';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly storageService: StorageService,
  ) {}

  async create(data: CreateTransactionDto, document): Promise<Transaction> {
    if (document) {
      const { blobName } = await this.storageService.uploadFile(
        document.buffer,
        document.originalname,
        document.mimetype,
      );
      data.documentUrl = blobName;
    }
    const transaction = this.transactionRepository.create(data);
    return this.transactionRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async update(id: string, data: UpdateTransactionDto): Promise<Transaction> {
    await this.transactionRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    const transaction = await this.findOne(id);
    if (transaction.documentUrl) {
      await this.storageService.deleteFile(transaction.documentUrl);
    }
    const result = await this.transactionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
  }
  async getTransactionFile(documentUrl: string, res: Response): Promise<void> {
    return this.storageService.getFile(documentUrl, res);
  }
}

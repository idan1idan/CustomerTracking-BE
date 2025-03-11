import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/CreateTransationDto';
import { UpdateTransactionDto } from './dto/UpdateTransactionDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseInterceptors(FileInterceptor('document'))
  create(
    @Body() data: CreateTransactionDto,
    @UploadedFile() document: Express.Multer.File,
  ): Promise<Transaction> {
    return this.transactionService.create(data, document);
  }

  @Get('download/:documentUrl')
  downloadFile(
    @Param('documentUrl') documentUrl: string,
    @Res() res: Response,
  ) {
    return this.transactionService.getTransactionFile(documentUrl, res);
  }

  @Get()
  findAll(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Transaction> {
    return this.transactionService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.transactionService.delete(id);
  }
}

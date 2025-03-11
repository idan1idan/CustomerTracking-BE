import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), StorageModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}

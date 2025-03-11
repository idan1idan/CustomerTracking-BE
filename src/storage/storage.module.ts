import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [StorageService],
  exports: [StorageService],
  controllers: [StorageController],
})
export class StorageModule {}

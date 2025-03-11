import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateTransactionDto {
  @IsEnum(['income', 'expense'])
  type: 'income' | 'expense';

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  amount: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsDateString()
  date: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  documentUrl?: string;
}

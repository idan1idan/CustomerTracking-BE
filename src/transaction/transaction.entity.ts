import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ['income', 'expense'] })
  type: 'income' | 'expense';

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column('text', { nullable: true })
  description: string;

  @Column('date')
  date: Date;

  @Column('varchar')
  category: string; // e.g., "Office Supplies", "Client Payment"
  @Column({ type: 'varchar', nullable: true })
  documentUrl?: string;
}

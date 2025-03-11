import { Customer } from 'src/customer/customer.entity';
import { Package } from 'src/package/packges.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer, (customer) => customer.appointments, {
    onDelete: 'CASCADE',
  })
  customer: Customer;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column()
  photoshootType: string;

  @Column('timestamp')
  date: Date;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  howMuchPaid: number;

  @Column({ default: false })
  isApproved: boolean;

  @OneToOne(() => Package, (packageEntity) => packageEntity.appointments, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn()
  package: Package;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

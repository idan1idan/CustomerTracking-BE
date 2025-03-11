import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Appointment } from 'src/appointment/appointment.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  phoneNumber: string;
  @Column({ nullable: true })
  secondPhoneNumber?: string;
  @Column()
  email: string;
  @OneToMany(() => Appointment, (appointment) => appointment.customer)
  appointments: Appointment[];
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: true, length: 7 })
  zipCode?: string;
}

import { Appointment } from 'src/appointment/appointment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  duration: number; // Duration in minutes or hours, based on your requirement

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'int' })
  minNumOfPictures: number;

  @Column({ type: 'int' })
  numOfEditedPictures: number;

  @Column({ default: false })
  isAlbumIncluded: boolean;

  @Column({ type: 'int' })
  numOfSets: number;

  @OneToOne(() => Appointment, (appointment) => appointment.package, {
    onDelete: 'CASCADE',
  })
  appointments: Appointment[];
}

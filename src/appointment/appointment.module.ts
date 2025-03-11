import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { Customer } from 'src/customer/customer.entity';
import { Package } from 'src/package/packges.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Customer, Package])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}

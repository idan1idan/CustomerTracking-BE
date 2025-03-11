import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment';
import { UpdateAppointmentDto } from './dto/update-appointment';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = this.appointmentRepository.create(createAppointmentDto);
    return this.appointmentRepository.save(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      relations: ['customer', 'package'],
    });
  }

  async findOne(id: string): Promise<Appointment | null> {
    return this.appointmentRepository.findOne({
      where: { id },
      relations: ['customer', 'package'],
    });
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment | null> {
    await this.appointmentRepository.update(id, updateAppointmentDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.appointmentRepository.delete(id);
  }
}

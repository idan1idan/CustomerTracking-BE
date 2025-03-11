import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(customer: CreateCustomerDto): Promise<Customer> {
    const newCustomer = this.customerRepository.create({
      ...customer,
    });
    return this.customerRepository.save(newCustomer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: string): Promise<Customer | null> {
    return this.customerRepository.findOne({
      where: { id },
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.customerRepository.delete(id);
    return result?.affected === 1;
  }
  async update(id: string, customer: CreateCustomerDto): Promise<UpdateResult> {
    const customerToUpdate = await this.customerRepository.findOne({
      where: { id },
    });
    if (!customerToUpdate) {
      throw new NotFoundException('Customer not found');
    }
    return this.customerRepository.update(id, customer);
  }
}

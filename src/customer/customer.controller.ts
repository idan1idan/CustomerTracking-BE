import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer';
import { UpdateResult } from 'typeorm';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() customer: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(customer);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() customer: CreateCustomerDto,
  ): Promise<UpdateResult> {
    return this.customerService.update(id, customer);
  }
  @Get()
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Customer | null> {
    return this.customerService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.customerService.delete(id);
  }
}

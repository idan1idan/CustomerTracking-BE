import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @ApiProperty()
  name: string;
  @IsPhoneNumber('IL')
  @ApiProperty()
  phoneNumber: string;
  @IsOptional()
  @IsPhoneNumber('IL')
  @ApiProperty()
  secondPhoneNumber?: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  address: string;
  @IsOptional()
  @IsString()
  @Length(7)
  @ApiProperty()
  zipCode?: string;
}

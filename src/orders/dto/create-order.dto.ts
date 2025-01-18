import { IsString, IsNotEmpty, IsEmail, IsOptional, IsDateString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  pickupAddress: string;

  @IsNotEmpty()
  @IsDateString()
  scheduledDate: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  deliveryAddress: string;

  @IsNotEmpty()
  @IsString()
  department: string;

  @IsNotEmpty()
  @IsString()
  municipality: string;

  @IsOptional()
  @IsString()
  referencePoint?: string;

  @IsOptional()
  @IsString()
  instructions?: string;
}

import { IsString, Length, Matches, IsOptional, IsEmail, IsNumber } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Column } from 'typeorm';

export class ClientRegisterDTO {

  @IsString()
  fullname: string;

  @IsString()
  email: string;

  @IsString()
  address: string;

  @IsNumber()
  availableBalance: number;

  @Optional()
  icon: string;

  @Optional()
  @IsString()
  managerId: string;

}

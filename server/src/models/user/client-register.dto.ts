import { IsString, Length, Matches, IsOptional, IsEmail, IsNumber } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Column } from 'typeorm';
import { agent } from 'supertest';

export class ClientRegisterDTO {

  @IsString()
  fullname: string;

  @IsString()
  email: string;

  @IsString()
  address: string;

  @IsNumber()
  availableBalance: number;

  @IsNumber()
  age: number;

  @Optional()
  icon: string;

  @Optional()
  managerId: string;

}

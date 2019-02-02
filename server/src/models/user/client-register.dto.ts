import { IsString, Length, Matches, IsOptional, IsEmail, IsNumber } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Column } from 'typeorm';
import { agent } from 'supertest';
import { Transform } from 'class-transformer';

export class ClientRegisterDTO {

  @IsString()
  fullname: string;

  @IsString()
  email: string;

  @IsString()
  address: string;

  @IsNumber()
  @Transform((value) => +value)
  availableBalance: number;

  @IsNumber()
  @Transform((value) => +value)
  age: number;

  @Optional()
  icon: string;

  @Optional()
  managerId: string;

}

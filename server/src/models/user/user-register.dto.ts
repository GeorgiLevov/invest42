import { IsString, Length, Matches, IsOptional, IsEmail } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Column } from 'typeorm';
import { Transform } from 'class-transformer';

export class UserRegisterDTO {

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)
  @Transform((value) => value)
  password: string;

  @Optional()
  avatar: string;

  @IsString()
  fullname: string;

  @IsString()
  role: string;

}

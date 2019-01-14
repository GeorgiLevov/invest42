import { IsString, Length, Matches, IsOptional, IsEmail } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Column } from 'typeorm';

export class UserRegisterDTO {

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)
  password: string;

  @Optional()
  avatar: string;

  @IsString()
  fullname: string;

  @IsString()
  role: string;

}

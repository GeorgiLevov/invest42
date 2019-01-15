import { IsEmail, IsString, Matches } from 'class-validator';
import { Optional } from '@nestjs/common';

export class ManagerUpdateDTO {

    @IsEmail()
    email: string;

    @IsString()
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)
    password: string;

  }

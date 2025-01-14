import { IsString, Length, Matches, IsOptional, IsEmail } from 'class-validator';

export class GetUserDTO {

  email: string;

  password: string;

  role: string;

  fullname: string;
}

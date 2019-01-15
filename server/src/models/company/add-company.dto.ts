import { IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class AddCompanyDTO {

  @IsString()
  name: string;

  @IsString()
  abbr: string;

  @Optional()
  @IsString()
  icon: string;

  @IsString()
  ceo: string;

  @IsString()
  address: string;

}

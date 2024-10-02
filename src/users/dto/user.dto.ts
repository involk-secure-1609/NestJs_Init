import { IsString, IsInt } from 'class-validator';

export class userDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsInt()
  age:number;
}

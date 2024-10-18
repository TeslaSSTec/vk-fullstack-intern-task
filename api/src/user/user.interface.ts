import { IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export interface IJWTPayload {
  id: string;
  login: string;
}

export class CreateUserDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(1, 30)
  login: string;

  @IsString()
  @Length(8, 30)
  password: string;
}

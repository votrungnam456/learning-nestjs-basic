import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsNumber()
  @IsOptional()
  readonly catId?: number;
}

export class DeleteUserDto {
  @IsNumber()
  readonly id: string;
}

export class UpdateUserDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsNumber()
  @IsOptional()
  readonly catId?: number;
}

import { IsEmail, MaxLength, MinLength } from 'class-validator';

export default class AuthRequestDTO {
  @IsEmail({}, { message: 'Invalid Email' })
  email: string;
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

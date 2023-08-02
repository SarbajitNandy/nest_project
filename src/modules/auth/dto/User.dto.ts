import { IsEmail, IsIn, Length, MaxLength, MinLength } from 'class-validator';

export default class UserDTO {
  id: string;

  @IsEmail({}, { message: 'Invalid Email' })
  email: string;
  @MinLength(8)
  @MaxLength(20)
  password: string;
  @IsIn([0, 1], { message: 'Role value should be either 0 or 1' })
  role: number;
}

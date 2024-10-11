import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class VerifyCodeDTO {
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{3}-\d{4}-\d{4}$/)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{6}$/)
  code: string;
}
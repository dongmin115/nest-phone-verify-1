import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SendVerificationDTO {
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{3}-\d{4}-\d{4}$/)
  phoneNumber: string;
}

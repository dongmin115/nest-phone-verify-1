import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { validateSync } from 'class-validator';
import { VerificationService } from './verification.service';
import { SendVerificationDTO } from './dto/send-verification.dto';
import { VerifyCodeDTO } from './dto/verify-code.dto';

@ApiTags('Phone Verification')
@Controller('phone-verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post('send-verification')
  @ApiBody({ type: SendVerificationDTO })
  sendVerification(@Body() body: SendVerificationDTO): { code: string } {
    const errors = validateSync(body);
    if (errors.length > 0) {
      throw new HttpException('요청 바디의 값이 유효하지 않습니다.', HttpStatus.BAD_REQUEST);
    }
    const code = this.verificationService.sendVerificationCode(body.phoneNumber);
    return { code };
  }

  @Post('verify-code')
  @ApiBody({ type: VerifyCodeDTO })
  verifyCode(@Body() body: VerifyCodeDTO): { result: boolean } {
    const errors = validateSync(body);
    if (errors.length > 0) {
      throw new HttpException('요청 바디의 값이 유효하지 않습니다.', HttpStatus.BAD_REQUEST);
    }
    const result = this.verificationService.verifyCode(body.phoneNumber, body.code);
    return { result };
  }
}
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { randomInt } from 'crypto';

interface VerificationStore {
  [phoneNumber: string]: { code: string; expiresAt: number };
}

@Injectable()
export class VerificationService {
  private verificationStore: VerificationStore = {};

  sendVerificationCode(phoneNumber: string): string {
    const code = randomInt(100000, 999999).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5분 후 만료
    this.verificationStore[phoneNumber] = { code, expiresAt };
    return code;
  }

  verifyCode(phoneNumber: string, code: string): boolean {
    const verification = this.verificationStore[phoneNumber];
    if (!verification || verification.expiresAt < Date.now()) {
      throw new HttpException('인증번호가 만료되었거나 존재하지 않습니다.', HttpStatus.BAD_REQUEST);
    }
    if (verification.code !== code) {
      throw new HttpException('인증번호가 일치하지 않습니다.', HttpStatus.BAD_REQUEST);
    }
    return true;
  }
}
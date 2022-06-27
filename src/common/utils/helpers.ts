import { generalConfig } from 'src/config/general.config';
import { extname } from 'path';

export const getVerifyCode = (min = 100000, max = 999999): string => {
  return Math.floor(Math.random() * (max - min) + min).toString();
}

export const isExpiredVerifyCode = (date: Date): boolean => {
  let expireDate = new Date(date.getTime() + generalConfig.EXPIRE_TIME_VERIFY_CODE);
  return expireDate < new Date()
}

export const getReferralCodes = (): string => {
  let referralCode = (new Date().getTime()).toString(36)
  return referralCode;
}


import { generalConfig } from 'src/config/general.config';
import * as ReferralCodes from 'referral-codes';

export const getVerifyCode = (min = 100000, max = 999999): string => {
  return Math.floor(Math.random() * (max - min) + min).toString();
}

export const isExpiredVerifyCode = (date: Date): boolean => {
  let expireDate = new Date(date.getTime() + generalConfig.EXPIRE_TIME_VERIFY_CODE);
  return expireDate < new Date()
}

export const getReferralCodes = (): string => {
  let referralCode = ReferralCodes.generate({
    length: 7,
    count: 1,
    charset: ReferralCodes.charset(ReferralCodes.Charset.ALPHABETIC).toUpperCase(),
  });

  return referralCode[0];
}
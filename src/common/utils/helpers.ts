import { generalConfig } from 'src/config/general.config';
import * as ReferralCodes from 'referral-codes';
import { extname } from 'path';

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
    charset: ReferralCodes.charset(ReferralCodes.Charset.ALPHABETIC).toLowerCase(),
  });

  return referralCode[0];
}

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const randomName = generateUUID();
  callback(null, `image-${randomName}`);
};


function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){//Use timestamp until depleted
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
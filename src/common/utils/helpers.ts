export const getVerifyCode = (min = 1000, max = 9999) => {
    return Math.floor(Math.random() * (max - min) + min).toString();
  }
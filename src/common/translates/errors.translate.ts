export const Field_Email_Is_Duplicate = {
    status_code: 200,
    code: 1000,
    message: {
      fa: "ایمیل تکراری است",
      en: "Field EMAIL Is Duplicated",
    },
  };
  export const Account_Is_Disabled = {
    status_code: 200,
    code: 1001,
    message: {
      fa: "اکانت غیر فعال شده است، لطفا بعدا تلاش کنید",
      en: "Acounnt is disabled, try again later",
    },
  };
  export const Signing_Up_Faild = {
    status_code: 500,
    code: 1002,
    message: {
      fa: "ثبت نام با خطا مواجه شده است، لطفا دوباره تلاش کنید",
      en: "Signing Up faild, please try again later",
    },  
  };
  export const Joi_Errors = {
    status_code: 422,
    code: 1003,
    message: {
      fa: "داده ورودی نا معتبر است",
      en: "",
    },
  };
  export const Invalid_Verify_Code = {
    status_code: 422,
    code: 1004,
    message: {
      fa: "کد اعتبار سنجی اشتباه است",
      en: "Invalid Verify Code",
    },
  };
  
  export const Authentication_Failed = {
    status_code: 403,
    code: 1005,
    message: {
      fa: "احراز هویت انجام نشد",
      en: "Authentication failed!",
    },
  };
  
  export const Invalid_Credentials = {
    status_code: 401,
    code: 1005,
    message: {
      fa: "اطلاعات ورودی نامعتبر است",
      en: "Invalid credentials, could not log you in!",
    },
  };
  
  export const Check_Credentials= {
    status_code: 401,
    code: 1006,
    message: {
      fa: "اطلاعات ورودی نامعتبر است",
      en: "Could not log you in, please check your credentials and try again.",
    },
  };
  export const Loggin_Failed= {
    status_code: 500,
    code: 1007,
    message: {
      fa: "ورود به سیستم ناموفق بود است، لطفاً بعدا دوباره امتحان کنید.",
      en: "Logging in failed, please try again later.",
    },
  };
  
  export const Bad_Request = {
    status_code: 400,
    code: 1008,
    message: {
      fa: "درخواست اشتباه است",
      en: "Bad Request Wrong",
    },
  };

  export const Something_Went_Wrong = {
    status_code: 500,
    code: 1009,
    message: {
      fa: "خطای سمت سرور",
      en: "Internal server Error",
    },
  };

  export const Expiration_Verify_Code = {
    status_code: 200,
    code: 1010,
    message: {
      fa: "کد تایید منقضی شده است",
      en: "expiration verify code",
    },
  };
  
  export const Username_Is_Duplicate = {
    status_code: 200,
    code: 1011,
    message: {
      fa: "نام کاربری تکراری است",
      en: "Username Is Duplicated",
    },
  };
  export const Invalid_Username = {
    status_code: 200,
    code: 1012,
    message: {
      fa: "نام کاربری اشتباه است",
      en: "Invalid Username",
    },
  };

  export const Login_Faild = {
    status_code: 200,
    code: 1012,
    message: {
      fa: "ورود به سامانه با خطا مواجه شده است",
      en: "Login Faild",
    },
  };
  
  export const User_Undefinded = {
    status_code: 200,
    code: 1013,
    message: {
      fa: "کاربر یافت نشد",
      en: "User Undefinded",
    },
  };
  export const Invalid_Token = {
    status_code: 401,
    code: 1014,
    message: {
      fa: "توکن نامعتبر است",
      en: "Invalid Token",
    },
  };
  export const Reset_Forget_Password_Faild = {
    status_code: 200,
    code: 1015,
    message: {
      fa: "فرایند بروز رسانی پسورد امکان پذیر نیست",
      en: "Reset Forget Password Faild",
    },
  };
  export const Access_Denied = {
    status_code: 403,
    code: 1016,
    message: {
      fa: "دسترسی به این مسیر امکان پذیر نمی باشد",
      en: "could not access to this api",
    },
  };
  export const Item_Is_Not_Founded = {
    status_code: 200,
    code: 1017,
    message: {
      fa: "مورد مورد نظر یافت نشد",
      en: "Item Is Not Founded",
    },
  };
  export const Transaction_Query_Faild = {
    status_code: 403,
    code: 1018,
    message: {
      fa: "خطا در کوئری مورد نظر",
      en: "Transaction Query Faild",
    },
  };
  export const API_Is_Not_Implemented = {
    status_code: 403,
    code: 1019,
    message: {
      fa: "درخواست مورد نظر پیاده سازی نشده است",
      en: "The API has not been implemented",
    },
  };
  export const Mobile_Number_Is_Duplicated = {
    status_code: 403,
    code: 1020,
    message: {
      fa: "شماره همراه تکراری است",
      en: "Mobile number is duplicated",
    },
  };
  export const Bad_Request_Exception = {
    status_code: 400,
    code: 1021,
    message: {
      fa: "درخواست نامعتبر است",
      en: "Bad request exception",
    },
  };
  export const Total_Resend_Code = {
    status_code: 400,
    code: 1022,
    message: {
      fa: "تا ۲۴ ساعت آینده ارسال مجدد کد امکان پذیر نیست ",
      en: "Please try 24 hours later again",
    },
  };
  export const Mobile_Number_Is_Not_Exist = {
    status_code: 403,
    code: 1023,
    message: {
      fa: "شماره همراه نامعتبر است",
      en: "Mobile number is not exist",
    },
  };
  export const Generate_New_Code = {
    status_code: 403,
    code: 1024,
    message: {
      fa: "برای دریافت کد جدید یک دقیقه صبر کنید",
      en: "Wait one minute for genreate a new code",
    },
  };
  export const Invalid_Captcha = {
    status_code: 403,
    code: 1025,
    message: {
      fa: " کپچا نامعتبر است",
      en: "Captcha is invalid",
    },
  };
  export const Mobile_Number_Is_Selected = {
    status_code: 422,
    code: 1020,
    message: {
      fa: "شماره همراه قبلا انتخاب شده است",
      en: "The mobile number has already been selected",
    },
  };
  export const Given_Data_Is_Invalid = {
    status_code: 422,
    code: 1020,
    message: {
      fa: "اطلاعات وارد شده اشتباه است",
      en: "The given data is invalid.",
    },
  };
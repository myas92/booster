import axios from 'axios';
export const sendSms = async (mobileNumber, message) => {
    if (process.env.NODE_ENV == 'dev') {
        return {
            RetStatus: 1,
            StrRetStatus: 'Ok',
            Value: '111111111111111',
        };
    }
    try {
        const data = JSON.stringify({
            "username": process.env.SMS_USERNAME,
            "password": process.env.SMS_PASSWORD,
            "to": mobileNumber,
            "from": process.env.SMS_FROM_MOBILE_NUMBER,
            "text": message,
            "isflash": "false"
        });

        const config = {
            method: 'post',
            url: 'http://rest.payamak-panel.com/api/SendSMS/SendSMS',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        let response = await axios(config)
        const result = response.data
        return result;
    } catch (err) {
        throw new Error(`Send SMS: ${err.message}`)
    }
}



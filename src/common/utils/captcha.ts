const axios = require('axios');
export const verifyCaptcha = async (token:string) => {
    if (process.env.NODE_ENV == 'dev') {
    	return true;
    }
    try {
    	const response = await axios.request({
    		baseURL: 'https://www.google.com/recaptcha/api/siteverify',
    		method: 'GET',
    		params: {
    			secret: process.env.CAPTCHA_SECRET_KEY,
    			response: token,
    		},
    	});

    	return response.data.success;
    } catch (err) {
    	throw new Error(`Verify captcha: ${err.message}`)
    }
}



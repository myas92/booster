export class AuthForgetPasswordCommand {

    constructor(req: any, body: any) {
        this.req = req;
        this.mobile_number = body.mobile_number;
        this.captcha = body.captcha;
    }
    req: any;
    mobile_number: string;
    captcha: string;
}
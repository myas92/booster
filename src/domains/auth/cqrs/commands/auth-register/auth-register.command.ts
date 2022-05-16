export class AuthRegisterCommand {

    constructor(req: any, body: any) {
        this.req = req;
        this.mobile_number = body.mobile_number;
        this.password = body.password;
        this.captcha = body.captcha;
        this.agreement = body.agreement;
    }
    req: any;
    mobile_number: string;
    password: string;
    captcha: string;
    agreement: boolean
}
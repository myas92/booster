export class ResendCodeCommand {

    constructor(req: any, mobile_number: string) {
        this.req = req;
        this.mobile_number = mobile_number;
    }
    req: any;
    mobile_number: string;
}
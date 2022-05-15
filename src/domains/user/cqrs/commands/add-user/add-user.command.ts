export class AddUserCommand {

    constructor(req: any, mobile_number: string, password: string, agreement: boolean = true) {
        this.req = req;
        this.mobile_number = mobile_number;
        this.password = password;
        this.agreement = agreement;
    }
    req: any;
    mobile_number: string;
    password: string;
    agreement: boolean
}
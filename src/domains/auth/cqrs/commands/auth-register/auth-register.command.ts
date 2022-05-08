export class AuthRegisterCommand {

    constructor(req: any, mobileNumber: string, password: string, agreement: boolean = true) {
        this.req = req;
        this.mobileNumber = mobileNumber?.toLowerCase();
        this.password = password;
        this.agreement = agreement;
    }
    req: any;
    mobileNumber: string;
    password: string;
    agreement: boolean
}
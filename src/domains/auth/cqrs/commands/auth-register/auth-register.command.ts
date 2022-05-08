export class AuthRegisterCommand {

    constructor(req: any, email: string, username: string, password: string, agreement: boolean = true) {
        this.req = req;
        this.email = email?.toLowerCase();
        this.username = username?.toLowerCase();
        this.password = password;
        this.agreement = agreement;
    }
    req: any;
    email: string;
    username: string;
    password: string;
    agreement: boolean
}
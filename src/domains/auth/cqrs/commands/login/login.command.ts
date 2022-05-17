export class LoginCommand {

    constructor(req: any, body: string) {
        this.req = req;
        this.body = body;
    }
    req: any;
    body: string;
}
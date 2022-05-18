export class AuthLoginCommand {

    constructor(req: any, body: any) {
        this.req = req;
        this.body = body;
    }
    req: any;
    body: any;
}
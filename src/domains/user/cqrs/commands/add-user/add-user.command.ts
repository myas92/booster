export class AddUserCommand {

    constructor(req: any, body: any) {
        this.req = req;
        this.body = body;
    }
    req: any;
    body: any
}
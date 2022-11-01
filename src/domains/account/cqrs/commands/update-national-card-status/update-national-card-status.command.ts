export class UpdateNationalCardStatusCommand {

    constructor(req: any, body: any, userId: string) {
        this.req = req;
        this.body = body;
        this.userId = userId;

    }
    req: any;
    body: any;
    userId: string;
}
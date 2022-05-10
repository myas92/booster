export class AddExampleRollbackCommand {

    constructor(req: any, name: string) {
        this.req = req;
        this.name = name?.toLowerCase();
    }
    req: any;
    name: string;
}
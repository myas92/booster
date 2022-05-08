export class AddExampleCommand {

    constructor(req: any, name: string, info: string) {
        this.req = req;
        this.name = name?.toLowerCase();
        this.info = info?.toLowerCase();
    }
    req: any;
    name: string;
    info: string;
}
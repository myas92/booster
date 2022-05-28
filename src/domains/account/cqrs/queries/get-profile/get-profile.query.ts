export class GetProfileQuery {

    constructor(req: any, userId: string) {
        this.req = req;
        this.userId = userId;
    }

    req: any;
    userId: string;
}
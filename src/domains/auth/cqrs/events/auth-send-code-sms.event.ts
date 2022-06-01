export class AuthSendCodeSmsEvent {

    constructor(mobileNumber: any, template: string) {
        this.mobileNumber = mobileNumber;
        this.template = template
    }

    mobileNumber: string;
    template: string;
}
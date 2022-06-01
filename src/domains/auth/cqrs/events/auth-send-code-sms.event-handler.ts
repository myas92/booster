import { AuthEventEntity } from './../../entities/auth-event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { sendSms } from './../../../../common/utils/send-sms';
import { CommandBus, EventBus, EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AuthSendCodeSmsEvent } from "./auth-send-code-sms.event";
import { Repository } from 'typeorm';


@EventsHandler(AuthSendCodeSmsEvent)
export class AuthSendCodeSmsEventHandler implements IEventHandler<AuthSendCodeSmsEvent>{
    constructor( @InjectRepository(AuthEventEntity)
    private readonly authEventRepository: Repository<AuthEventEntity>) { }

    async handle(event: AuthSendCodeSmsEvent) {
        try {
            const mobileNumber = event.mobileNumber;
            const message = event.template;
            let smsEventInfo = await sendSms(mobileNumber, message);
            let authEvent = new  AuthEventEntity();
            authEvent.mobile_number =  mobileNumber;
            authEvent.value = smsEventInfo.Value;
            authEvent.status = smsEventInfo.RetStatus;
            authEvent.message = message
            this.authEventRepository.save(authEvent)
        } catch (error) {
            console.log('Auth Send Code EmailEventHandler')
        }

    }
}

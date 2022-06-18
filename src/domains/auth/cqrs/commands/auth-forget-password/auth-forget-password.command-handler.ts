import { Mobile_Number_Is_Not_Exist } from './../../../../../common/translates/errors.translate';
import { getVerifyTemplate } from '../../../../../common/templates/verify.template';
import { AuthSendCodeSmsEvent } from '../../events/auth-send-code-sms.event';
import { UserService } from '../../../../user/user.service';
import { Invalid_Captcha, Mobile_Number_Is_Selected } from '../../../../../common/translates/errors.translate';
import { verifyCaptcha } from '../../../../../common/utils/captcha';
import { getVerifyCode } from '../../../../../common/utils/helpers';
import { BadRequestException, ConflictException, HttpException, HttpStatus, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Connection, Repository } from "typeorm";
import { hashSync } from "bcrypt";

import { AuthForgetPasswordCommand } from "./auth-forget-password.command";
import { AuthVerificationEntity } from "../../../entities/auth-verification.entity";

import { AuthVerificationTypeEnum } from "../../../entities/enums/auth-verification-type.enum";
import { Account_Is_Disabled, Total_Resend_Code } from '../../../../../common/translates/errors.translate';
import { AuthService } from '../../../auth.service';

@CommandHandler(AuthForgetPasswordCommand)
export class AuthForgetPasswordCommandHandler implements ICommandHandler<AuthForgetPasswordCommand> {

    constructor(
        private readonly jwtService: JwtService,
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus,
        @InjectRepository(AuthVerificationEntity)
        private readonly authVerificationRepository: Repository<AuthVerificationEntity>,
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {
    }

    async execute(command: AuthForgetPasswordCommand): Promise<any> {
        try {

            const { mobile_number, captcha } = command
            const isValidCaptcha = await verifyCaptcha(captcha);

            // بررسی کپچا
            if (!isValidCaptcha) {
                throw new HttpException(Invalid_Captcha, Invalid_Captcha.status_code);
            }

            // بررسی اینکه کاربر وجود داشته باشد
            const user = await this.userService.findOneByMobileNumber(mobile_number);
            if (!user)
                throw new HttpException(Mobile_Number_Is_Not_Exist, Mobile_Number_Is_Not_Exist.status_code)

            // بررسی تعداد دفعات درخواست فراموشی رمز در ۲۴ ساعت گذشته
            const forgetPasswordUserInfo = await this.authService.getNumberOfForgetPasswordIn24Hours(mobile_number);
            if (forgetPasswordUserInfo.length > 4) { // valid just under 5 attempts for register
                throw new HttpException(Total_Resend_Code, Total_Resend_Code.status_code);
            }

            const code = getVerifyCode()
            let forgetPassowrdInfo = new AuthVerificationEntity();
            // TODO: دریافت آی پی معتبر
            forgetPassowrdInfo.ip = command.req.ip;
            forgetPassowrdInfo.mobile_number = mobile_number;
            forgetPassowrdInfo.password = ""
            forgetPassowrdInfo.verify_code = code;
            forgetPassowrdInfo.total_resend_code = 0
            forgetPassowrdInfo.type = AuthVerificationTypeEnum.ForgetPassword;
            forgetPassowrdInfo.created_at = new Date(Date.now())

            let savedForgetPasswordInfo = await this.authVerificationRepository.save(forgetPassowrdInfo);

            let result: any = {
                mobile_number: mobile_number,
                stream_token: savedForgetPasswordInfo.id
            }
            // TODO: Change it after test
            if (process.env.NODE_ENV != 'dev') {
                this.eventBus.publish(new AuthSendCodeSmsEvent(mobile_number, getVerifyTemplate(code)));
            }
            else {
                result = {
                    mobile_number: mobile_number,
                    stream_token: savedForgetPasswordInfo.id,
                    code: code
                }
            }
            return result
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }
}




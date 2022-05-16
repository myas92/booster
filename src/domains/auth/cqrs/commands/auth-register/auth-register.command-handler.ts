import { Invalid_Captcha } from './../../../../../common/translates/errors.translate';
import { verifyCaptcha } from './../../../../../common/utils/captcha';
import { getVerifyCode } from './../../../../../common/utils/helpers';
import { BadRequestException, ConflictException, HttpException, HttpStatus, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Connection, Repository } from "typeorm";
import { hashSync } from "bcrypt";

import { AuthRegisterCommand } from "./auth-register.command";
import { AuthVerificationEntity } from "../../../entities/auth-verification.entity";

import { AuthVerificationTypeEnum } from "../../../entities/enums/auth-verification-type.enum";
import { Account_Is_Disabled, Total_Resend_Code } from '../../../../../common/translates/errors.translate';
import { AuthService } from '../../../../../domains/auth/auth.service';
@CommandHandler(AuthRegisterCommand)
export class AuthRegisterCommandHandler implements ICommandHandler<AuthRegisterCommand> {

    constructor(
        private readonly jwtService: JwtService,
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus,
        @InjectRepository(AuthVerificationEntity)
        private readonly authVerificationRepository: Repository<AuthVerificationEntity>,
        private readonly authService: AuthService,
    ) {
    }

    async execute(command: AuthRegisterCommand): Promise<any> {
        try {

            let code = getVerifyCode();
            const { mobile_number, password, captcha } = command
            const isValidCaptcha = await verifyCaptcha(captcha);
            
            // بررسی کپچا
            if (!isValidCaptcha) {
                throw new HttpException(Invalid_Captcha, Invalid_Captcha.status_code);
            }

            // بررسی تعداد دفعات درخواست ثبت نام در ۲۴ ساعت گذشته
            let authUserInfo = await this.authService.getAuthUserByPhoneIn24Hours(mobile_number);
            if (authUserInfo.length > 4) { // valid just under 5 attempts for register
                throw new HttpException(Total_Resend_Code, Total_Resend_Code.status_code);
            }
            //TODO: Is user exist??

            let registerInfo = new AuthVerificationEntity();
            registerInfo.ip = command.req.ip;
            registerInfo.mobile_number = mobile_number;
            registerInfo.password = hashSync(password, 10);
            registerInfo.verify_code = code;
            registerInfo.total_resend_code = 0
            registerInfo.type = AuthVerificationTypeEnum.Register;
            registerInfo.created_at = new Date(Date.now())

            await this.authVerificationRepository.save(registerInfo);
            return { code: code };
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }
}




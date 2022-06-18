import { isExpiredVerifyCode } from './../../../../../common/utils/helpers';
import { Given_Data_Is_Invalid, Invalid_Token } from './../../../../../common/translates/errors.translate';
import { Mobile_Number_Is_Not_Exist } from '../../../../../common/translates/errors.translate';
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

import { AuthForgetPasswordConfirmCommand } from "./auth-forget-password-confirm.command";
import { AuthVerificationEntity } from "../../../entities/auth-verification.entity";

import { AuthVerificationTypeEnum } from "../../../entities/enums/auth-verification-type.enum";
import { Account_Is_Disabled, Total_Resend_Code } from '../../../../../common/translates/errors.translate';
import { AuthService } from '../../../auth.service';

@CommandHandler(AuthForgetPasswordConfirmCommand)
export class AuthForgetPasswordConfirmCommandHandler implements ICommandHandler<AuthForgetPasswordConfirmCommand> {

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

    async execute(command: AuthForgetPasswordConfirmCommand): Promise<any> {
        try {
            const { stream_token, code } = command.body;

            const forgetPasswordInfo = await this.authVerificationRepository.findOne({
                where: {
                    id: stream_token,
                    verify_code: code
                }
            });

            if (!forgetPasswordInfo)
                throw new HttpException(Given_Data_Is_Invalid, Given_Data_Is_Invalid.status_code);

            if (forgetPasswordInfo.is_used)
                throw new HttpException(Given_Data_Is_Invalid, Given_Data_Is_Invalid.status_code);

            if (isExpiredVerifyCode(forgetPasswordInfo.created_at))
                throw new HttpException(Invalid_Token, Invalid_Token.status_code);

                forgetPasswordInfo.is_used = true;
            await this.authVerificationRepository.save(forgetPasswordInfo);

            const user = await this.userService.findOneByMobileNumber(forgetPasswordInfo.mobile_number)
            const token = await this.jwtService.sign({
                userId: user.id,
                mobile_number: user.mobile_number,
                role: user.role
            });
            // TODO: Delete the verify code from return
            return {
                user_id: user.id,
                token: token
            };
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }
}




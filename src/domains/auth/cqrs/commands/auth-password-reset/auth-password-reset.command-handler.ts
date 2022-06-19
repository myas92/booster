import { isExpiredVerifyCode } from '../../../../../common/utils/helpers';
import { Given_Data_Is_Invalid, Invalid_Token } from '../../../../../common/translates/errors.translate';
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

import { AuthPasswordResetCommand } from "./auth-password-reset.command";
import { AuthVerificationEntity } from "../../../entities/auth-verification.entity";

import { AuthVerificationTypeEnum } from "../../../entities/enums/auth-verification-type.enum";
import { Account_Is_Disabled, Total_Resend_Code } from '../../../../../common/translates/errors.translate';
import { AuthService } from '../../../auth.service';

@CommandHandler(AuthPasswordResetCommand)
export class AuthPasswordResetCommandHandler implements ICommandHandler<AuthPasswordResetCommand> {

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

    async execute(command: AuthPasswordResetCommand): Promise<any> {
        try {
            const { body, req } = command;
            const { password } = body;
            const { id } = req.user;

            const user = await this.userService.findOneById(id);
            user.password = hashSync(password, 10);
            let result = await this.userService.save(user);
            // TODO: Delete the verify code from return
            return {};
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }
}




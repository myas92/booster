import { Invalid_Token } from './../../../../../common/translates/errors.translate';
import { isExpiredVerifyCode } from './../../../../../common/utils/helpers';
import { LoginTypeEnum } from '../../../entities/enums/login-type.enum';
import { LoginVerificationEntity } from '../../../entities/auth-login-verification.entity';
import { Given_Data_Is_Invalid } from '../../../../../common/translates/errors.translate';
import { UserService } from '../../../../user/user.service';
import { getVerifyCode } from '../../../../../common/utils/helpers';
import { Total_Resend_Code, Mobile_Number_Is_Not_Exist, Generate_New_Code } from '../../../../../common/translates/errors.translate';
import { generalConfig } from 'src/config/general.config';
// import moment from "moment"
import * as moment from 'moment-jalaali';
import { BadRequestException, HttpException } from "@nestjs/common";
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Connection, Repository } from "typeorm";

import { AuthLoginConfirmCommand } from "./auth-login-confirm.command";
import { AuthVerificationEntity } from "../../../entities/auth-verification.entity";
import { AuthService } from '../../../auth.service';

@CommandHandler(AuthLoginConfirmCommand)
export class AuthLoginConfirmCommandHandler implements ICommandHandler<AuthLoginConfirmCommand> {

    constructor(
        private readonly jwtService: JwtService,
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus,
        @InjectRepository(AuthVerificationEntity)
        private readonly authVerificationRepository: Repository<AuthVerificationEntity>,
        @InjectRepository(LoginVerificationEntity)
        private readonly loginVerificationRepository: Repository<LoginVerificationEntity>,
        private readonly authService: AuthService,
        private readonly connection: Connection,
    ) {
    }

    async execute(command: AuthLoginConfirmCommand): Promise<any> {
        try {
            const { stream_token, code } = command.body;

            // دریافت کاربر با شماره همراه
            const loginVerificationInfo = await this.loginVerificationRepository.findOne({
                where: {
                    id: stream_token,
                    verify_code: code
                }
            });

            if (!loginVerificationInfo)
                throw new HttpException(Given_Data_Is_Invalid, Given_Data_Is_Invalid.status_code);

            if (loginVerificationInfo.is_used)
                throw new HttpException(Given_Data_Is_Invalid, Given_Data_Is_Invalid.status_code);

            if (isExpiredVerifyCode(loginVerificationInfo.created_at))
                throw new HttpException(Invalid_Token, Invalid_Token.status_code);

            loginVerificationInfo.is_used = true;
            await this.loginVerificationRepository.save(loginVerificationInfo);

            const token = await this.jwtService.sign({
                userId: loginVerificationInfo.user_id,
                mobile_number: loginVerificationInfo.mobile_number,
                role: loginVerificationInfo.role
            });
            // TODO: Delete the verify code from return
            return {
                token: token
            };
        } catch (error) {
            throw new HttpException(error, error.status);
        }

    }

}

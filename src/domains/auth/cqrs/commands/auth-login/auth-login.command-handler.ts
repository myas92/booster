import { Given_Data_Is_Invalid } from './../../../../../common/translates/errors.translate';
import { UserService } from './../../../../user/user.service';
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

import { AuthLoginCommand } from "./auth-login.command";
import { AuthVerificationEntity } from "../../../entities/auth-verification.entity";
import { AuthService } from '../../../auth.service';
import { compareSync } from "bcrypt";
import { AuthVerificationTypeEnum } from "../../../entities/enums/auth-verification-type.enum";

@CommandHandler(AuthLoginCommand)
export class AuthLoginCommandHandler implements ICommandHandler<AuthLoginCommand> {

    constructor(
        private readonly jwtService: JwtService,
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus,
        @InjectRepository(AuthVerificationEntity)
        private readonly authVerificationRepository: Repository<AuthVerificationEntity>,
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly connection: Connection,
    ) {
    }

    async execute(command: AuthLoginCommand): Promise<any> {
        try {
            const { mobile_number, password } = command.body;

            // دریافت کاربر با شماره همراه
            const user = await this.userService.findOneByMobileNumber(mobile_number);
            if (!user)
                throw new HttpException(Given_Data_Is_Invalid, Given_Data_Is_Invalid.status_code);

            // بررسی رمز عبور
            const compare = compareSync(password, user.password);
            if (!compare)
                throw new HttpException(Given_Data_Is_Invalid, Given_Data_Is_Invalid.status_code);

            let token = await this.jwtService.sign({ userId: user.id, username: user.mobile_number, role: user.role });
            return {
                token: token
            };
        } catch (error) {
            throw new HttpException(error, error.status);
        }

    }

}

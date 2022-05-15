import { getVerifyCode } from './../../../../../common/utils/helpers';
import { Total_Resend_Code, Mobile_Number_Is_Not_Exist, Generate_New_Code } from './../../../../../common/translates/errors.translate';
import { generalConfig } from 'src/config/general.config';
// import moment from "moment"
import * as moment from 'moment-jalaali';
import { BadRequestException, HttpException } from "@nestjs/common";
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Connection, Repository } from "typeorm";
import { hashSync } from "bcrypt";

import { ResendCodeCommand } from "./resend-code.command";
import { AuthVerificationEntity } from "../../../entities/auth-verification.entity";
import { AuthService } from './../../../auth.service';

import { AuthVerificationTypeEnum } from "../../../entities/auth-verification-type.enum";

@CommandHandler(ResendCodeCommand)
export class ResendCodeCommandHandler implements ICommandHandler<ResendCodeCommand> {

    constructor(
        private readonly jwtService: JwtService,
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus,
        @InjectRepository(AuthVerificationEntity)
        private readonly authVerificationRepository: Repository<AuthVerificationEntity>,
        private readonly authService: AuthService,
        private readonly connection: Connection,
    ) {
    }

    async execute(command: ResendCodeCommand): Promise<any> {
        try {
            const { mobile_number } = command
            let authUserInfo = await this.authService.getAuthUserByPhone(mobile_number);
            if (!authUserInfo) {
                throw new HttpException(Mobile_Number_Is_Not_Exist, Mobile_Number_Is_Not_Exist.status_code);
            }
            if (authUserInfo.total_resend_code > 3) {// 5 attempts maximum
                throw new HttpException(Total_Resend_Code, Total_Resend_Code.status_code);
            }
            const validTime = moment().subscribe(1, 'minutes');
            if(validTime < authUserInfo.updated_at){
                throw new HttpException(Generate_New_Code, Generate_New_Code.status_code)
            }
            authUserInfo.total_resend_code = authUserInfo.total_resend_code + 1;
            authUserInfo.verify_code = getVerifyCode();
            await this.authVerificationRepository.save(authUserInfo);
            return { code: authUserInfo.verify_code }
        } catch (error) {
            throw new HttpException(error, error.status);
        }

    }

}

import { Total_Resend_Code, Mobile_Number_Is_Not_Exist } from './../../../../../common/translates/errors.translate';
import { generalConfig } from 'src/config/general.config';
import moment from "moment"
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
            if (authUserInfo) {// 5 attempts
                throw new HttpException(Mobile_Number_Is_Not_Exist, Mobile_Number_Is_Not_Exist.status_code);
            }
            if (authUserInfo.total_resend_code < 3) {// 5 attempts
                throw new HttpException(Total_Resend_Code, Total_Resend_Code.status_code);
            }
            console.log(command);
        } catch (error) {
            throw new HttpException(error, error.status);
        }

    }

}

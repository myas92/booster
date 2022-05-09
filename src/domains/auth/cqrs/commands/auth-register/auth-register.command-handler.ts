import { generalConfig } from 'src/config/general.config';
import moment from "moment"
import { BadRequestException, ConflictException, HttpException, HttpStatus, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { hashSync } from "bcrypt";

import { AuthRegisterCommand } from "./auth-register.command";
import { AuthVerificationEntity } from "../../../entities/auth-verification.entity";

import { AuthVerificationTypeEnum } from "../../../entities/auth-verification-type.enum";
import { Account_Is_Disabled } from 'src/common/translates/errors.translate';
@CommandHandler(AuthRegisterCommand)
export class AuthRegisterCommandHandler implements ICommandHandler<AuthRegisterCommand> {

    constructor(
        private readonly jwtService: JwtService,
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus,
        @InjectRepository(AuthVerificationEntity)
        private readonly authVerificationRepository: Repository<AuthVerificationEntity>

    ) {
    }
    
    async execute(command: AuthRegisterCommand): Promise<any> {
        try {

            let code = '1111'
            const { mobile_number, password } = command
            let registerInfo = new AuthVerificationEntity();
            registerInfo.ip = command.req.ips.s;
            registerInfo.mobile_number = command.mobile_number;
            registerInfo.password = hashSync(password, 10);
            registerInfo.verification_code = code;
            registerInfo.type = AuthVerificationTypeEnum.Register;
            registerInfo.created_at = new Date(Date.now())
            await this.authVerificationRepository.save(registerInfo);
            return { code: code };
        } catch (error) {
            throw new HttpException(error, error.status);

        }
    }

}

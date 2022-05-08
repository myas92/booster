import { generalConfig } from 'src/config/general.config';
import moment from "moment"
import { BadRequestException, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { hashSync } from "bcrypt";

import { AuthRegisterCommand } from "./auth-register.command";
import { AuthVerificationEntity } from "../../../entities/auth-verification.entity";

import { AuthVerificationTypeEnum } from "../../../entities/auth-verification-type.enum";
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
            let token = '1111'
            console.log('FIRST API')
            const {mobileNumber, password} = command
            let registerInfo = new AuthVerificationEntity();
            registerInfo.mobileNumber = command.mobileNumber;
            registerInfo.password = hashSync(password, 10);
            registerInfo.verificationToken = token;
            registerInfo.type = AuthVerificationTypeEnum.Register;
            registerInfo.ip = command.req.ip;
            registerInfo.createdAt= new Date(Date.now())
            console.log(registerInfo)
            await this.authVerificationRepository.save(registerInfo);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

}

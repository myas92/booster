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
            console.log('FIRST API')
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

}

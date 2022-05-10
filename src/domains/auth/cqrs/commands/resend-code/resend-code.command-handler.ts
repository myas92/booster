import { generalConfig } from 'src/config/general.config';
import moment from "moment"
import { BadRequestException, ConflictException, HttpException, HttpStatus, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Connection, Repository } from "typeorm";
import { hashSync } from "bcrypt";

import { ResendCodeCommand } from "./resend-code.command";
import { AuthVerificationEntity } from "../../../entities/auth-verification.entity";

import { AuthVerificationTypeEnum } from "../../../entities/auth-verification-type.enum";
import { Account_Is_Disabled } from 'src/common/translates/errors.translate';
import { AuthService } from 'src/domains/auth/auth.service';
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
        console.log(command);
    }

}

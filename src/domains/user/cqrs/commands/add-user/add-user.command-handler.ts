import { getVerifyCode } from '../../../../../common/utils/helpers';
import { BadRequestException, ConflictException, HttpException, HttpStatus, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Connection, Repository } from "typeorm";
import { hashSync } from "bcrypt";

import { AddUserCommand } from "./add-user.command";
import { UserEntity } from "../../../entities/user.entity";

import { Account_Is_Disabled, Total_Resend_Code } from '../../../../../common/translates/errors.translate';
// import { AuthService } from '../../../../auth/auth.service';
@CommandHandler(AddUserCommand)
export class AddUserCommandHandler implements ICommandHandler<AddUserCommand> {

    constructor(
        private readonly jwtService: JwtService,
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus,
        @InjectRepository(UserEntity)
        private readonly authVerificationRepository: Repository<UserEntity>,
    ) {
    }

    async execute(command: AddUserCommand): Promise<any> {
        try {
            const { name, password } = command.body
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }
}



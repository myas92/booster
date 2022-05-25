import { getVerifyCode } from '../../../../../common/utils/helpers';
import { BadRequestException, ConflictException, HttpException, HttpStatus, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { hashSync } from "bcrypt";

import { AddCartCommand } from "./add-cart.command";
import { AccountEntity } from "../../../entities/account.entity";

import { Account_Is_Disabled, Total_Resend_Code } from '../../../../../common/translates/errors.translate';
// import { AuthService } from '../../../../auth/auth.service';
@CommandHandler(AddCartCommand)
export class AddCartCommandHandler implements ICommandHandler<AddCartCommand> {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus,
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>,
    ) {
    }

    async execute(command: AddCartCommand): Promise<any> {
        try {
            const { name, password } = command.body
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }
}



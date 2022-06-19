import { AccountStatusEnum } from '../../../../user/entities/enums/account-status.enum copy';
import { Given_Data_Is_Invalid } from '../../../../../common/translates/errors.translate';
import { AccountService } from '../../../account.service';
import { getVerifyCode } from '../../../../../common/utils/helpers';
import { BadRequestException, ConflictException, HttpException, HttpStatus, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { hashSync } from "bcrypt";

import { NationalCardImageCommand } from "./national-card-image.command";
import { AccountEntity } from "../../../entities/account.entity";

import { Account_Is_Disabled, Total_Resend_Code } from '../../../../../common/translates/errors.translate';
// import { AuthService } from '../../../../auth/auth.service';
@CommandHandler(NationalCardImageCommand)
export class NationalCardImageCommandHandler implements ICommandHandler<NationalCardImageCommand> {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus,
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>,
        private readonly accountService: AccountService
    ) {
    }

    async execute(command: NationalCardImageCommand): Promise<any> {
        try {
            const { body, req } = command;
            const { filename } = body;
            const { id } = req.user;
            // TODO : اگه قبلا حساب داشت میتونه این ای پی ای رو صدا بزنه یا نه
            let userAccount = await this.accountService.findOneByUserId(id);
            userAccount.national_card_image = filename;

            userAccount.status_national_card_image = AccountStatusEnum.EDITED;
            let result = await userAccount.save();
            return { national_card_image: filename }
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }
}



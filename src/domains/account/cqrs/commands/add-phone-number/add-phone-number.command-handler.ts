import { AccountStatusEnum } from './../../../../user/entities/enums/account-status.enum copy';
import { Given_Data_Is_Invalid } from './../../../../../common/translates/errors.translate';
import { AccountService } from './../../../account.service';
import { getVerifyCode } from '../../../../../common/utils/helpers';
import { BadRequestException, ConflictException, HttpException, HttpStatus, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { hashSync } from "bcrypt";

import { AddPhoneNumberCommand } from "./add-phone-number.command";
import { AccountEntity } from "../../../entities/account.entity";

import { Account_Is_Disabled, Total_Resend_Code } from '../../../../../common/translates/errors.translate';
// import { AuthService } from '../../../../auth/auth.service';
@CommandHandler(AddPhoneNumberCommand)
export class AddPhoneNumberCommandHandler implements ICommandHandler<AddPhoneNumberCommand> {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus,
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>,
        private readonly accountService: AccountService
    ) {
    }

    async execute(command: AddPhoneNumberCommand): Promise<any> {
        try {
            const { body, req } = command;
            const { phone_number } = body;
            const { id } = req.user;
            // TODO : اگه قبلا حساب داشت میتونه این ای پی ای رو صدا بزنه یا نه
            let userAccount = await this.accountService.findOneByUserId(id);
            if (!userAccount.phone_number)
                throw new HttpException(Given_Data_Is_Invalid, Given_Data_Is_Invalid.status_code)
            userAccount.phone_number = phone_number;
            // TODO: بررسی وضعیت شماره تلفن ادیتت درسته یا معتبر؟
            userAccount.status_phone_number = AccountStatusEnum.EDITED;
            let result = await userAccount.save();
            return { phone_number: phone_number }
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }
}



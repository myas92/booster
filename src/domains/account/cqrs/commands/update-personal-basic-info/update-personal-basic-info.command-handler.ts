import { AccountStatusEnum } from '../../../../user/entities/enums/account-status.enum';
import { Register_Under_18_Years_Old } from '../../../../../common/translates/errors.translate';
import { AccountService } from '../../../account.service';
import { HttpException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";

import { UpdatePersonalBasicInfoCommand } from "./update-personal-basic-info.command";
import { AccountEntity } from "../../../entities/account.entity";
import * as moment from 'moment-jalaali';
@CommandHandler(UpdatePersonalBasicInfoCommand)
export class UpdatePersonalBasicInfoCommandHandler implements ICommandHandler<UpdatePersonalBasicInfoCommand> {

    constructor(
        private readonly accountService: AccountService
    ) {
    }

    async execute(command: UpdatePersonalBasicInfoCommand): Promise<any> {
        try {
            const { body, req } = command;
            const { first_name, last_name, national_code, birthday } = body;
            const { id } = req.user;
            const dateFormat = 'YYYY-MM-DD'
            const validBirtday = moment(birthday, dateFormat).add(18, 'Y').format(dateFormat);
            const currentDate = moment().format(dateFormat)
            if (validBirtday > currentDate) {
                throw new HttpException(Register_Under_18_Years_Old, Register_Under_18_Years_Old.status_code)
            }
            // TODO: Create a validation for Natioanl Code

            let userAccount = await this.accountService.findOneByUserId(id);
            userAccount.first_name = first_name;
            userAccount.status_first_name = AccountStatusEnum.EDITED;
            userAccount.last_name = last_name;
            userAccount.status_last_name = AccountStatusEnum.EDITED;
            userAccount.national_code = national_code;
            userAccount.status_national_code = AccountStatusEnum.EDITED;
            userAccount.birthday = birthday;
            userAccount.status_birthday = AccountStatusEnum.EDITED;
            await userAccount.save();

            return body
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }
}



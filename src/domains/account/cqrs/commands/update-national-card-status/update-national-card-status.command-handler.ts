import { HttpException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AccountStatusEnum } from './../../../../user/entities/enums/account-status.enum';
import { Given_Data_Is_Invalid } from '../../../../../common/translates/errors.translate';
import { AccountService } from '../../../account.service';
import { UpdateNationalCardStatusCommand } from "./update-national-card-status.command";


@CommandHandler(UpdateNationalCardStatusCommand)
export class UpdateNationalCardStatusCommandHandler implements ICommandHandler<UpdateNationalCardStatusCommand> {

    constructor(
        private readonly accountService: AccountService
    ) {
    }

    async execute(command: UpdateNationalCardStatusCommand): Promise<any> {
        try {
            const { body, req, userId } = command;
            const { status_national_card_image } = body;
            const { role } = req.user;
            if (AccountStatusEnum[status_national_card_image]) {
                let userAccount = await this.accountService.findOneByUserId(userId);
                userAccount.status_national_card_image = status_national_card_image;
                await userAccount.save();
                const foundedAccount = await this.accountService.findOneById(userId);
                return foundedAccount.toDto(role)
            }
            else {
                throw new HttpException(Given_Data_Is_Invalid, Given_Data_Is_Invalid.status_code)
            }
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }

}



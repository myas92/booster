import { National_Card_Image_Size, Image_Is_Not_Valid } from './../../../../../common/translates/errors.translate';
import { generalConfig } from 'src/config/general.config';
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
import { join } from 'path';
import { existsSync, rmdirSync, unlink, unlinkSync } from 'fs';
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
            const { file, filename, size } = body;
            const { id } = req.user;
            const uploadPath = join(__dirname, `../../../../../../../upload/${id}/`)

            let userAccount = await this.accountService.findOneByUserId(id);
            let oldNationalCardImage = userAccount.national_card_image;
            let oldNationalCardImageStatus = userAccount.status_national_card_image;

            //  بررسی حجم عکس
            if (filename) {
                if (size > generalConfig.MAX_IMAGE_SIZE) {
                    let dir = join(uploadPath, `${filename}`)
                    if (existsSync(dir))
                        unlinkSync(dir)
                    throw new HttpException(National_Card_Image_Size, National_Card_Image_Size.status_code);
                }
            } else {
                throw new HttpException(Image_Is_Not_Valid, Image_Is_Not_Valid.status_code);
            }

            userAccount.national_card_image = filename;
            userAccount.status_national_card_image = AccountStatusEnum.EDITED;
            await userAccount.save();

            //پاک کردن عکس قبلی که ذخیره شده اگر در حالت ویرایش است
            try {
                if (oldNationalCardImage &&
                    oldNationalCardImageStatus == AccountStatusEnum.EDITED
                ) {
                    let dir = join(uploadPath, `${oldNationalCardImage}`)
                    if (existsSync(dir))
                        unlinkSync(dir)
                }
            }
            catch (error) {
                console.log(error)
            }

            return { national_card_image: filename }
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }
}



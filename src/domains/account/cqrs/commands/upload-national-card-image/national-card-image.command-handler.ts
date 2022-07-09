import { National_Card_Image_Size, Image_Is_Not_Valid } from './../../../../../common/translates/errors.translate';
import { generalConfig } from 'src/config/general.config';
import { AccountStatusEnum } from '../../../../user/entities/enums/account-status.enum';
import { AccountService } from '../../../account.service';
import { HttpException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";

import { NationalCardImageCommand } from "./national-card-image.command";
import { AccountEntity } from "../../../entities/account.entity";

import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';
// import { AuthService } from '../../../../auth/auth.service';
@CommandHandler(NationalCardImageCommand)
export class NationalCardImageCommandHandler implements ICommandHandler<NationalCardImageCommand> {

    constructor(
        private readonly accountService: AccountService
    ) {
    }

    async execute(command: NationalCardImageCommand): Promise<any> {
        try {
            const { body, req } = command;
            const { filename, size } = body;
            const { id } = req.user;
            const uploadPath = join(__dirname, `../../../../../../../upload/${id}/`)

            let userAccount = await this.accountService.findOneByUserId(id);
            let oldNationalCardImage = userAccount.national_card_image;
            let oldNationalCardImageStatus = userAccount.status_national_card_image;

            //  بررسی حجم عکس
            await this.deleteImageWithExtraSize(filename, uploadPath, size)

            userAccount.national_card_image = filename;
            userAccount.status_national_card_image = AccountStatusEnum.EDITED;
            await userAccount.save();

            //پاک کردن عکس قبلی که ذخیره شده اگر در حالت ویرایش است
            await this.deleteOldationalCardImage(oldNationalCardImage, oldNationalCardImageStatus, uploadPath)

            return { national_card_image: filename }
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }

    async deleteImageWithExtraSize(filename, uploadPath, size) {
        if (size > generalConfig.MAX_IMAGE_SIZE) {
            let dir = join(uploadPath, `${filename}`)
            if (existsSync(dir))
                unlinkSync(dir)
            throw new HttpException(National_Card_Image_Size, National_Card_Image_Size.status_code);
        }
    }

    async deleteOldationalCardImage(oldNationalCardImage, oldNationalCardImageStatus, uploadPath) {
        try {
            console.log()
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
    }
}



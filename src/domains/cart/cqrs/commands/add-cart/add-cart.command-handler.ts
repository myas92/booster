import { AccountStatusEnum } from './../../../../user/entities/enums/account-status.enum copy';
import { Given_Data_Is_Invalid } from './../../../../../common/translates/errors.translate';
import { CartService } from './../../../cart.service';
import { AccountService } from './../../../../account/account.service';
import { CartEntity } from './../../../entities/cart.entity';
import { BadRequestException, ConflictException, HttpException, HttpStatus, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AddCartCommand } from "./add-cart.command";


import { Account_Is_Disabled, Total_Resend_Code } from '../../../../../common/translates/errors.translate';
// import { AuthService } from '../../../../auth/auth.service';
@CommandHandler(AddCartCommand)
export class AddCartCommandHandler implements ICommandHandler<AddCartCommand> {

    constructor(
        @InjectRepository(CartEntity)
        private readonly cartRepository: Repository<CartEntity>,
        private readonly accountService: AccountService,
    ) {
    }

    async execute(command: AddCartCommand): Promise<any> {
        try {
            const { body, req } = command;
            const { cart_number } = body;
            const { id } = req.user;
            // TODO : اگه قبلا حساب داشت میتونه این ای پی ای رو صدا بزنه یا نه
            let userAccount = await this.accountService.findOneById(id);
            if (userAccount.carts.some(cart => cart.cart_number == cart_number))
                throw new HttpException(Given_Data_Is_Invalid, Given_Data_Is_Invalid.status_code)
            let bank_account_info = new CartEntity();
            bank_account_info.cart_number = cart_number;
            bank_account_info.account = userAccount;
            bank_account_info.status = AccountStatusEnum.EDITED;
            let result = await bank_account_info.save();
            return result.toDto();
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }
}



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
        private readonly accountService: AccountService
    ) {
    }

    async execute(command: AddCartCommand): Promise<any> {
        try {
            const { cart_number } = command.body
            const { userId } = command.req
            let account = await this.accountService.findOneById(userId);
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }
}



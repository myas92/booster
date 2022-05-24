import { UserService } from './../../../user.service';
import { getVerifyCode } from '../../../../../common/utils/helpers';
import { BadRequestException, ConflictException, HttpException, HttpStatus, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { hashSync } from "bcrypt";

import { UpdateUserCommand } from "./update-user.command";
import { UserEntity } from "../../../entities/user.entity";

import { Account_Is_Disabled, Total_Resend_Code } from '../../../../../common/translates/errors.translate';
// import { AuthService } from '../../../../auth/auth.service';
@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private userService: UserService
    ) {
    }

    async execute(command: UpdateUserCommand): Promise<any> {
        try {
            const { req, body } = command;
            const { userId } = req.params
            const { first_name, last_name, national_code, birthday } = body;

            let foundedUser = await this.userService.findOneById(userId);

            foundedUser.first_name = first_name
            foundedUser.last_name = last_name
            foundedUser.national_code = national_code
            foundedUser.birthday = birthday
            
            await this.userService.save(foundedUser);
            return foundedUser.toDtoUpdate();
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }
}



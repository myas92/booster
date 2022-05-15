import { getVerifyCode } from '../../../../../common/utils/helpers';
import { BadRequestException, ConflictException, HttpException, HttpStatus, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Connection, Repository } from "typeorm";
import { hashSync } from "bcrypt";

import { AddUserCommand } from "./add-user.command";
import { UserEntity } from "../../../entities/user.entity";

import { Account_Is_Disabled, Total_Resend_Code } from '../../../../../common/translates/errors.translate';
import { AuthService } from '../../../../auth/auth.service';
@CommandHandler(AddUserCommand)
export class AddUserCommandHandler implements ICommandHandler<AddUserCommand> {

    constructor(
        private readonly jwtService: JwtService,
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus,
        @InjectRepository(UserEntity)
        private readonly authVerificationRepository: Repository<UserEntity>,
        private readonly authService: AuthService,
    ) {
    }

    async execute(command: AddUserCommand): Promise<any> {
        try {
            
            let code = getVerifyCode();
            const { mobile_number, password } = command
            let authUserInfo = await this.authService.getAuthUserByPhoneIn24Hours(mobile_number);
            if(authUserInfo.length > 4){ // valid just under 5 attempts for register
                throw new HttpException(Total_Resend_Code, Total_Resend_Code.status_code);
            }
            //TODO: Is user exist??

            let registerInfo = new UserEntity();
            registerInfo.mobile_number = mobile_number;
            registerInfo.password = hashSync(password, 10);
            registerInfo.created_at = new Date(Date.now())

            await this.authVerificationRepository.save(registerInfo);
            return { code: code };
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }
}



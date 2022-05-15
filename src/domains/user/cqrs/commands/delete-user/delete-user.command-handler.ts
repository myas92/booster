import { getVerifyCode } from '../../../../../common/utils/helpers';
import { Total_Resend_Code, Mobile_Number_Is_Not_Exist, Generate_New_Code } from '../../../../../common/translates/errors.translate';
import { generalConfig } from 'src/config/general.config';
// import moment from "moment"
import * as moment from 'moment-jalaali';
import { BadRequestException, HttpException } from "@nestjs/common";
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Connection, Repository } from "typeorm";
import { hashSync } from "bcrypt";

import { DeleteUserCommand } from "./delete-user.command";
import { UserEntity } from "../../../entities/user.entity";
import { AuthService } from '../../../user.service';


@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand> {

    constructor(
        private readonly jwtService: JwtService,
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus,
        @InjectRepository(UserEntity)
        private readonly authVerificationRepository: Repository<UserEntity>,
        private readonly authService: AuthService,
        private readonly connection: Connection,
    ) {
    }

    async execute(command: DeleteUserCommand): Promise<any> {
        try {
            const { mobile_number } = command
            let authUserInfo = await this.authService.getAuthUserByPhone(mobile_number);
            if (!authUserInfo) {
                throw new HttpException(Mobile_Number_Is_Not_Exist, Mobile_Number_Is_Not_Exist.status_code);
            }
            if (authUserInfo.email > '3') {// 5 attempts maximum
                throw new HttpException(Total_Resend_Code, Total_Resend_Code.status_code);
            }
            const validTime = moment().subscribe(1, 'minutes');
            if(validTime < authUserInfo.updated_at){
                throw new HttpException(Generate_New_Code, Generate_New_Code.status_code)
            }
            await this.authVerificationRepository.save(authUserInfo);
            return { code:'1'}
        } catch (error) {
            throw new HttpException(error, error.status);
        }

    }

}

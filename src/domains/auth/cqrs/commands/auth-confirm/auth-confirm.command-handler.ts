import { UserEntity } from './../../../../user/entities/user.entity';
import { Account_Is_Disabled } from './../../../../../common/translates/errors.translate';
import { VerificationStatusEnum } from './../../../../user/entities/enums/verification-status';
import { UserRoleEnum } from './../../../../user/entities/enums/user-role.enum';
import { isExpiredVerifyCode, getReferralCodes } from './../../../../../common/utils/helpers';
import { UserService } from './../../../../user/user.service';
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

import { AuthConfirmCommand } from "./auth-confirm.command";
import { AuthVerificationEntity } from "../../../entities/auth-verification.entity";
import { AuthService } from '../../../auth.service';

import { AuthVerificationTypeEnum } from "../../../entities/enums/auth-verification-type.enum";

@CommandHandler(AuthConfirmCommand)
export class AuthConfirmCommandHandler implements ICommandHandler<AuthConfirmCommand> {

    constructor(
        private readonly jwtService: JwtService,
        private readonly commandBus: CommandBus,
        private readonly eventBus: EventBus,
        @InjectRepository(AuthVerificationEntity)
        private readonly authVerificationRepository: Repository<AuthVerificationEntity>,
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly connection: Connection,
    ) {
    }

    async execute(command: AuthConfirmCommand): Promise<any> {
        try {

            const { code, mobile_number } = command.body;
            let foundedUser = await this.userService.findOneByMobileNumber(mobile_number);
            if (foundedUser)
                throw new HttpException(Account_Is_Disabled, 200);

            let foundedAuthUser = await this.authService.getAuthUserByPhone(mobile_number)
            if (!foundedAuthUser)
                throw new HttpException(Account_Is_Disabled, 200);

            if (foundedAuthUser.verify_code != code)
                throw new HttpException(Account_Is_Disabled, 200);

            if (isExpiredVerifyCode(foundedAuthUser.created_at))
                throw new HttpException(Account_Is_Disabled, 200);




            const queryRunner = this.connection.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                let user = new UserEntity();
                user.mobile_number = foundedAuthUser.mobile_number;
                user.password = foundedAuthUser.password;
                user.referral_code = getReferralCodes();
                user.role = UserRoleEnum.User;
                user.verification = VerificationStatusEnum.Unverified;

                foundedAuthUser.is_used = true;
                foundedAuthUser.password = "";

                await queryRunner.manager.save(user);
                await queryRunner.manager.save(foundedAuthUser);

                await queryRunner.commitTransaction();
            } catch (err) {
                await queryRunner.rollbackTransaction();
            } finally {
                await queryRunner.release();
            }

            return {}
        } catch (error) {
            throw new HttpException(error, error.status);
        }

    }

}

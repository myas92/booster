import * as moment from 'moment-jalaali';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { AuthVerificationEntity } from './entities/auth-verification.entity';
import { AuthVerificationTypeEnum } from './entities/enums/auth-verification-type.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthVerificationEntity)
        private readonly authVerificationRepository: Repository<AuthVerificationEntity>
    ) { }

    async getAuthUserByPhone(mobileNumber) {
        const result = await this.authVerificationRepository.findOne({
            where: [{ mobile_number: mobileNumber, is_used: false }],
            order: { created_at: 'DESC' }
        });
        return result;
    }

    async getAuthUserByPhoneIn24Hours(mobileNumber) {

        let date = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
        const result = await this.authVerificationRepository.find({
            where: [{
                mobile_number: mobileNumber,
                created_at: MoreThan(date),
                is_used: false,
                type: AuthVerificationTypeEnum.Register
            }],
            order: { created_at: 'DESC' }
        });
        return result;
    }

    async getNumberOfForgetPasswordIn24Hours(mobileNumber) {

        let date = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
        const result = await this.authVerificationRepository.find({
            where: [{
                mobile_number: mobileNumber,
                created_at: MoreThan(date),
                is_used: false,
                type: AuthVerificationTypeEnum.ForgetPassword
            }],
            order: { created_at: 'DESC' }
        });
        return result;
    }

    async getAuthUser(mobileNumber: string) {
        const result = this.authVerificationRepository.findOne({
            where: {
                mobile_number: mobileNumber,
                is_used: false,
                type: AuthVerificationTypeEnum.Register
            },
            order: { created_at: 'DESC' }
        })
    }

    async getAllRecords() {
        let result = await this.authVerificationRepository.find();
        console.log(result)
        return result;
    }
}

import * as moment from 'moment-jalaali';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { AuthVerificationEntity } from './entities/auth-verification.entity';

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
        let date = moment().subtract(1, 'days')
        const result = await this.authVerificationRepository.find({
            where: [{
                mobile_number: mobileNumber, 
                created_at:  MoreThan(date),
                is_used: false
            }],
            order: { created_at: 'DESC' }
        });
        return result;
    }

    async getAllRecords() {
        let result = await this.authVerificationRepository.find();
        console.log(result)
        return result;
    }
}

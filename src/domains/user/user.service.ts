import * as moment from 'moment-jalaali';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async save(userInfo) {
        try {
            const result = await this.userRepository.save(userInfo);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async findOneById(userId) {
        let result = await this.userRepository.findOne({
            where: { id: userId, is_deleted: false }
        })
        return result
    }
    
    async findOneByMobileNumber(mobileNumber) {
        let result = this.userRepository.findOne({
            where: { mobile_number: mobileNumber, is_deleted: false }
        })
        return result
    }
    async getAuthUserByPhoneIn24Hours(mobileNumber) {

        let date = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
        const result = await this.userRepository.find({
            where: [{
                mobile_number: mobileNumber,
                created_at: MoreThan(date),
                is_used: false,
            }],
            order: { created_at: 'DESC' }
        });
        return result;
    }

    async getAllRecords() {
        let result = await this.userRepository.find();
        console.log(result)
        return result;
    }
}

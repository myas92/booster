import * as moment from 'moment-jalaali';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { AccountEntity } from './entities/account.entity';
import { Role } from '../user/entities/enums/user-role.enum';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>
    ) { }

    async findOneById(userId) {
        let result = await this.accountRepository
            .createQueryBuilder("accounts")
            .innerJoinAndSelect("accounts.user", "user")
            .leftJoinAndSelect("accounts.carts", "cart")
            .where("user.id = :userId", { userId: userId })
            .getOne()
        return result
    }
    // 
    async findAll(limit = 10, offset = 0, query = '', value = {}) {
        let result = await this.accountRepository
            .createQueryBuilder("accounts")
            .innerJoinAndSelect("accounts.user", "user")
            .leftJoinAndSelect("accounts.carts", "cart")
            .orderBy('accounts.updated_at')
            .where("user.is_deleted = :value", { value: false })
            .where("user.role = :value", { value: Role.USER })
            .where(query, value)
            .limit(limit)
            .offset(offset)
            .getMany()
        return result
    }
    async getTotalCount(query = '', value = {}) {
        let result = await this.accountRepository
            .createQueryBuilder("accounts")
            .innerJoinAndSelect("accounts.user", "user")
            .leftJoinAndSelect("accounts.carts", "cart")
            .orderBy('accounts.updated_at')
            .where("user.is_deleted = :value", { value: false })
            .where("user.role = :value", { value: Role.USER })
            .where(query, value)
            .getCount()
        return result
    }
    async findOneByUserId(userId) {
        let result = await this.accountRepository
            .createQueryBuilder("accounts")
            .where("user_id = :userId", { userId: userId })
            .where("is_deleted = :value", { value: false })
            .getOne()
        return result
    }

}

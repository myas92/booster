import * as moment from 'moment-jalaali';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { AccountEntity } from './entities/account.entity';

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
        .getOne()
        // SELECT * from accounts
        // inner join users on users.id = accounts.user_id
        // https://stackoverflow.com/questions/65525851/how-to-make-inner-join-to-work-on-typeorm#:~:text=TypeORM%20has%20a%20method%20called,table%20will%20be%20selected%20from.
        return result
    }

}

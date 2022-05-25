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


}

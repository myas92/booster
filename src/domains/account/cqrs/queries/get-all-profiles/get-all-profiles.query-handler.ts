import { InjectRepository } from '@nestjs/typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { AccountEntity } from './../../../entities/account.entity';
import { Repository, Connection, QueryResult } from 'typeorm';
import { AccountService } from '../../../account.service';
import { Unable_Access_Information } from '../../../../../common/translates/errors.translate';
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllProfilesQuery } from "./get-all-profiles.query";
import { HttpException, InternalServerErrorException } from "@nestjs/common";

@QueryHandler(GetAllProfilesQuery)
export class GetAllProfilesQueryHandler implements IQueryHandler<GetAllProfilesQuery> {

    constructor(
        private readonly accountService: AccountService,
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>,
        @InjectConnection() private readonly connection: Connection
    ) {
    }

    async execute(query: GetAllProfilesQuery): Promise<any> {
        try {
            let { limit, offset } = query.req.query;
            limit = limit ? limit : 10;
            offset = offset ? offset : 0

            const { queryStr, queryValues } = this.getQueryStrAndValues(query.req.query)

            let [foundedProfiles, count] = await Promise.all([
                this.accountService.findAll(limit, offset, queryStr, queryValues),
                this.accountService.getTotalCount()
            ])

            const result = []
            for (let profile of foundedProfiles) {
                result.push(profile.toDto())
            }
            return { total: count, data: result }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }

    }

    getQueryStrAndValues = (list) => {
        let queryStr, queryValues = {};
        for (let key in list) {
            if (key.includes('status')) {
                if (queryStr) {
                    queryStr = `${queryStr} OR accounts.${key} =:${key}`;
                    queryValues[key] = list[key];
                }
                else {
                    queryStr = `accounts.${key} =:${key}`;
                    queryValues[key] = list[key];
                }
            }
        }
        return { queryStr, queryValues }
    }

}
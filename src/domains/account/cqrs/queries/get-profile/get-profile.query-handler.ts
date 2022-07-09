import { AccountService } from './../../../account.service';
import { Unable_Access_Information } from '../../../../../common/translates/errors.translate';
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProfileQuery } from "./get-profile.query";
import { HttpException, InternalServerErrorException } from "@nestjs/common";

@QueryHandler(GetProfileQuery)
export class GetProfileQueryHandler implements IQueryHandler<GetProfileQuery> {

    constructor(
        private readonly accountService: AccountService
    ) {
    }

    async execute(query: GetProfileQuery): Promise<any> {
        try {
            const { userId } = query;
            const foundedAccount = await this.accountService.findOneById(userId);
            return foundedAccount.toDto()
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }

    }

}
import { Unable_Access_Information } from './../../../../../common/translates/errors.translate';
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserQuery } from "./get-user.query";
import { HttpException, InternalServerErrorException } from "@nestjs/common";

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {

    constructor(
    ) {
    }

    async execute(query: GetUserQuery): Promise<any> {
        try {
            const { req, userId } = query;
            const { role } = req.user;
            if (req.user.userId == userId) {
                throw new HttpException(Unable_Access_Information, Unable_Access_Information.status_code)
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }

    }

}
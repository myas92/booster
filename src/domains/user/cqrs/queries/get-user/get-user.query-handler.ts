import { UserService } from './../../../user.service';
import { Unable_Access_Information } from './../../../../../common/translates/errors.translate';
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserQuery } from "./get-user.query";
import { HttpException, InternalServerErrorException } from "@nestjs/common";

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {

    constructor(
        private readonly userService: UserService
    ) {
    }

    async execute(query: GetUserQuery): Promise<any> {
        try {
            const { userId } = query;
            const foundedUser = await this.userService.findOneById(userId);
            return foundedUser.toDto()
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }

    }

}
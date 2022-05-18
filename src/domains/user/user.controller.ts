import { GetProfileResponseDto } from './dto/get-profile.dto';
import { AuthResendCodeResponseDto, AuthResendCodeSubmitDto } from './dto/delete-user.dto';
import { Request_Was_Successful } from '../../common/translates/success.translate';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { diskStorage } from 'multer';
import * as fs from "fs";
import {
    Body,
    Controller,
    Headers,
    HttpStatus,
    Post,
    Req,
    UseFilters,
    UseInterceptors,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiConflictResponse,
    ApiHeader,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags
} from "@nestjs/swagger";

import { UserService } from "./user.service";
// import { HttpExceptionFilter } from "../../infrastructure/filters/http-exception.filter";
import { AddUserResponseDto, AddUserSubmitDto } from "./dto/add-user.dto";
import { FormatResponseInterceptor } from "../../common/interceptors/format-response.interceptor";
import { HttpExceptionFilter } from "../../common/filters/http-exception.filter";

import { AddUserCommand } from "./cqrs/commands/add-user/add-user.command";
import { DeleteUserCommand } from "./cqrs/commands/delete-user/delete-user.command";




// import { FormatResponseInterceptor } from "../../infrastructure/interceptors/format-response.interceptor";

@UseInterceptors(FormatResponseInterceptor)
@UseFilters(new HttpExceptionFilter())
@Controller('api/v1/user')
@ApiTags('User')
export class UserController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly userService: UserService
    ) {
    }
    @Post('/')
    @ApiBody({ type: AddUserSubmitDto })
    async register(@Body() body: AddUserSubmitDto, @Req() req, @Headers('language') language): Promise<AddUserResponseDto> {
        const result = await this.commandBus.execute(new AddUserCommand(req, body));
        return new AddUserResponseDto(result, Request_Was_Successful.message[language]);
    }
    @Post('/profile')
    async getProfile(@Req() req, @Headers('language') language): Promise<GetProfileResponseDto> {
        // const result = await this.commandBus.execute(new AddUserCommand(req));
        let result = 'true';
        return new GetProfileResponseDto(result, Request_Was_Successful.message[language]);
    }


}

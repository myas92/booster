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
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags
} from "@nestjs/swagger";

import { AuthService } from "./user.service";
// import { HttpExceptionFilter } from "../../infrastructure/filters/http-exception.filter";
import { AuthRegisterResponseDto, AuthRegisterSubmitDto } from "./dto/add-user.dto";
import { FormatResponseInterceptor } from "../../common/interceptors/format-response.interceptor";
import { HttpExceptionFilter } from "../../common/filters/http-exception.filter";

import { AddUserCommand } from "./cqrs/commands/add-user/add-user.command";
import { DeleteUserCommand } from "./cqrs/commands/delete-user/delete-user.command";




// import { FormatResponseInterceptor } from "../../infrastructure/interceptors/format-response.interceptor";

@UseInterceptors(FormatResponseInterceptor)
@UseFilters(new HttpExceptionFilter())
@Controller('api/v1/auth')
@ApiTags('Auth')
export class AuthController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly authService: AuthService
    ) {
    }

    @Post('register-temp')
    @ApiBody({ type: AuthRegisterSubmitDto })
    async registerTemp(@Body() body: AuthRegisterSubmitDto, @Req() req, @Headers('language') language): Promise<AuthRegisterResponseDto> {
        // const result = await this.commandBus.execute(new AddUserCommand(req, body.mobile_number, body.password));
        let result = await this.authService.getAllRecords()
        return new AuthRegisterResponseDto('12', 'کد تایید با موفقیت ارسال شد');
    }
    @Post('register')
    @ApiBody({ type: AuthRegisterSubmitDto })
    async register(@Body() body: AuthRegisterSubmitDto, @Req() req, @Headers('language') language): Promise<AuthRegisterResponseDto> {
        const result = await this.commandBus.execute(new AddUserCommand(req, body.mobile_number, body.password));
        return new AuthRegisterResponseDto(result.code, Request_Was_Successful.message[language]);
    }
    @Post('resend-code')
    @ApiBody({ type: AuthResendCodeSubmitDto })
    async resendToken(@Body() body: AuthResendCodeSubmitDto, @Req() req, @Headers('language') language): Promise<AuthRegisterResponseDto> {
        const result = await this.commandBus.execute(new DeleteUserCommand(req, body.mobile_number));
        return new AuthResendCodeResponseDto(result.code, Request_Was_Successful.message[language]);
    }


}

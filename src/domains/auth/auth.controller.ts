import { Request_Was_Successful } from './../../common/translates/success.translate';
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

// import { HttpExceptionFilter } from "../../infrastructure/filters/http-exception.filter";
import { AuthRegisterCommand } from "./cqrs/commands/auth-register/auth-register.command";
import { AuthRegisterResponseDto, AuthRegisterSubmitDto } from "./dto/auth-register.dto";
import { FormatResponseInterceptor } from "../../common/interceptors/format-response.interceptor";
import { HttpExceptionFilter } from "../../common/filters/http-exception.filter";
import { AuthService } from "./auth.service";
import { ResendCodeCommand } from "./cqrs/commands/resend-code/resend-code.command";




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
    async registerTemp(@Body() body: AuthRegisterSubmitDto, @Req() req, @Headers() headers): Promise<AuthRegisterResponseDto> {
        // const result = await this.commandBus.execute(new AuthRegisterCommand(req, body.mobile_number, body.password));
        let result = await this.authService.getAllRecords()
        return new AuthRegisterResponseDto('12', 'کد تایید با موفقیت ارسال شد');
    }
    @Post('register')
    @ApiBody({ type: AuthRegisterSubmitDto })
    async register(@Body() body: AuthRegisterSubmitDto, @Req() req, @Headers() headers): Promise<AuthRegisterResponseDto> {
        const result = await this.commandBus.execute(new AuthRegisterCommand(req, body.mobile_number, body.password));
        return new AuthRegisterResponseDto(result.code, Request_Was_Successful.message[headers.language]);
    }
    @Post('register/resend-code')
    @ApiBody({ type: AuthRegisterSubmitDto })
    async resendToken(@Body() body: AuthRegisterSubmitDto, @Req() req): Promise<AuthRegisterResponseDto> {
        const result = await this.commandBus.execute(new ResendCodeCommand(req, body.mobile_number, body.password));
        return new AuthRegisterResponseDto('123', Request_Was_Successful[req.language]);
    }


}

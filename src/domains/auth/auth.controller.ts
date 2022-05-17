import { AuthConfirmSubmitDto, AuthConfirmResponseDto } from './dto/auth-confirm.dto';
import { AuthConfirmCommand } from './cqrs/commands/auth-confirm/auth-confirm.command';
import { AuthResendCodeResponseDto, AuthResendCodeSubmitDto } from './dto/auth-resend-code.dto';
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
import { AuthResendCodeCommand } from "./cqrs/commands/auth-resend-code/auth-resend-code.command";




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

    @Post('register')
    @ApiBody({ type: AuthRegisterSubmitDto })
    async register(@Body() body: AuthRegisterSubmitDto, @Req() req, @Headers('language') language): Promise<AuthRegisterResponseDto> {
        const result = await this.commandBus.execute(new AuthRegisterCommand(req, body));
        return new AuthRegisterResponseDto(result.code, Request_Was_Successful.message[language]);
    }
    @Post('resend-code')
    @ApiBody({ type: AuthResendCodeSubmitDto })
    async resendToken(@Body() body: AuthResendCodeSubmitDto, @Req() req, @Headers('language') language): Promise<AuthRegisterResponseDto> {
        const result = await this.commandBus.execute(new AuthResendCodeCommand(req, body.mobile_number));
        return new AuthResendCodeResponseDto(result.code, Request_Was_Successful.message[language]);
    }
    @Post('confirm')
    @ApiBody({ type: AuthConfirmSubmitDto })
    async confirmResendCode(@Body() body: AuthConfirmSubmitDto, @Req() req, @Headers('language') language): Promise<AuthConfirmResponseDto> {
        const result = await this.commandBus.execute(new AuthConfirmCommand(req, body));
        return new AuthConfirmResponseDto(result.code, Request_Was_Successful.message[language]);
    }
    @Post('login')
    @ApiBody({ type: AuthResendCodeSubmitDto })
    async login(@Body() body: AuthResendCodeSubmitDto, @Req() req, @Headers('language') language): Promise<AuthRegisterResponseDto> {
        const result = await this.commandBus.execute(new AuthResendCodeCommand(req, body.mobile_number));
        return new AuthResendCodeResponseDto(result.code, Request_Was_Successful.message[language]);
    }


}

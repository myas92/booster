import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { Something_Went_Wrong } from '../translates/errors.translate';
import { generalConfig } from '../../config/general.config';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception, host: ArgumentsHost) {
        let result;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const generalError = exception.getResponse();
        let language = request.headers['language'] as string

        language = (language && generalConfig.LANGUAGES.includes(language)) ? (language) : 'fa';
        if (generalError.response) {
            result = {
                status_code: generalError.response.status_code,
                error_code: generalError.response.code,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: generalError.response.message[language],
            }
        }
        // If none exception error is happened
        else {
            result = {
                status_code: Something_Went_Wrong.status_code,
                error_code: Something_Went_Wrong.code,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: Something_Went_Wrong.message[language],
                //TODO : remove this line from
                message_developer: exception.message
            }
        }

        response.status(result.status_code)
            .json({ status: "error", data: result });
    }
}

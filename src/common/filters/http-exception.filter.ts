import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { Something_Went_Wrong, Bad_Request_Exception } from '../translates/errors.translate';
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

        if (generalError.response) {
            result = {
                status_code: generalError.response.status_code,
                error_code: generalError.response.code,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: generalError.response.message[language],
            }
        }
        if (exception.status === 400 && exception.message === "Bad Request Exception") {
            result = {
                status_code: Bad_Request_Exception.status_code,
                error_code: Bad_Request_Exception.code,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: Bad_Request_Exception.message[language],
                //TODO : remove this line from
                message_developer: exception.getResponse().message
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

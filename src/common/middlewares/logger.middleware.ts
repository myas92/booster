import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    logger = new Logger(LoggerMiddleware.name);

    use(req: Request, res: Response, next: Function) {
        const ip = req.ip
        this.logger.verbose(`[${req.hostname}][${req.method}][${ip}] : ${req.originalUrl}`)
        next();
    }
}

import { generalConfig } from 'src/config/general.config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {


    use(req: Request, res: Response, next: Function) {
        let language = req.headers['language'] as string
        language = (language && generalConfig.LANGUAGES.includes(language)) ? (language) : 'fa';
        req.headers['language'] = language;
        next();
    }
}

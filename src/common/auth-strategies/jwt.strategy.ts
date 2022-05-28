import { Invalid_Token } from './../translates/errors.translate';
import { HttpException, Injectable, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from './../../domains/user/user.service';

import { UserStatusEnum } from './../../domains/user/entities/enums/user-status.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.TOKEN_SECRET
        })
    }

    async validate(payload: any) {

        if (payload) {

            let user:any = await this.userService.findOneById(payload.userId);
            if (!user || user.is_deleted === true) {
                throw new HttpException(Invalid_Token, Invalid_Token.status_code);
            }

            if (user.state === UserStatusEnum.DeActive) {
                throw new HttpException(Invalid_Token, Invalid_Token.status_code);
            }
            return {
                id: user.id,
                role: user.role
            }
        }
        throw new HttpException(Invalid_Token, Invalid_Token.status_code);
    }
}
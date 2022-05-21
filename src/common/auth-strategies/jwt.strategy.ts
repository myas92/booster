import { Injectable, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
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

            let user = await this.userService.findOneById(payload.userId);
            if (!user || user.is_deleted === true) {
                throw new NotAcceptableException("EXC_83EFF9S3 | token is invalid");
            }

            if (user.status === UserStatusEnum.DeActive) {
                throw new NotAcceptableException("EXC_83EFF9A3 | this user is deactivated");
            }

            if (user) {
                return payload;
            }
        }
        throw new UnauthorizedException("EXC_5807ED17 | Can not found user with this id");
    }
}
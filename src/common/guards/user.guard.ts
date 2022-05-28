import { Role } from '../../domains/user/entities/enums/user-role.enum';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export const ROLES_KEY = 'roles';

@Injectable()
export class CheckUserIdGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        if (req.user?.id == req.params?.userId) {
            return true;
        }
        return false;
    }
} 
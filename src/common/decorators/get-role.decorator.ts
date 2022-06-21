import { SetMetadata } from '@nestjs/common';
import { Role } from '../../domains/user/entities/enums/user-role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
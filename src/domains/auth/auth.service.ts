import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthVerificationEntity } from './entities/auth-verification.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthVerificationEntity)
        private readonly authVerificationRepository: Repository<AuthVerificationEntity>
    ) { }

    async getAllRecords() {
        let result = await this.authVerificationRepository.find();
        console.log(result)
        return result;
    }
}

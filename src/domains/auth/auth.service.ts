import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { AuthVerificationEntity } from './entities/auth-verification.entity';

@Injectable()
export class AuthService {
    constructor(private connection: Connection,
        @InjectRepository(AuthVerificationEntity)
        private readonly authVerificationRepository: Repository<AuthVerificationEntity>
    ) { }

    async getAllRecords() {
        let result = await this.authVerificationRepository.find();
        console.log(result)
        return result;
    }
    async createMany(users) {
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.save(users[0]);
            await queryRunner.manager.save(users[1]);

            await queryRunner.commitTransaction();
        } catch (err) {
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction();
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();
        }
    }
}

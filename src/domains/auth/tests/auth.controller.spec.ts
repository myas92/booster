import { QueryBus } from '@nestjs/cqrs';
import { CommandBus } from '@nestjs/cqrs';
import { AuthVerificationEntity } from '../entities/auth-verification.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthService } from '../auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, CommandBus, QueryBus,
        {
          provide: getRepositoryToken(AuthVerificationEntity),
          useValue: {},
        },
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

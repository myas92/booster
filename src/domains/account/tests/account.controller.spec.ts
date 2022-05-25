import { QueryBus } from '@nestjs/cqrs';
import { CommandBus } from '@nestjs/cqrs';
import { AccountEntity } from '../entities/account.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AccountService } from '../account.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from '../account.controller';

describe('AccountController', () => {
  let controller: AccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService, CommandBus, QueryBus,
        {
          provide: getRepositoryToken(AccountEntity),
          useValue: {},
        },
      ]
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

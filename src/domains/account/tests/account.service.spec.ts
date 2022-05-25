import { AccountEntity } from '../entities/account.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '../account.service';

describe('AuthService', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService,
        {
          provide: getRepositoryToken(AccountEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

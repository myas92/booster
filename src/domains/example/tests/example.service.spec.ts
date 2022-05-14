import { CommandBus } from '@nestjs/cqrs';
import { AddExampleCommandHandler } from './../cqrs/commands/add-example/add-example.command-handler';
import { AddExampleRollbackCommandHandler } from './../cqrs/commands/add-example-rollback/add-example-rollback.command-handler';
import { AuthCheckUsernameQueryHandler } from './../../auth/cqrs/queries/auth-check-username/auth-check-username.query-handler';
import { Test, TestingModule } from '@nestjs/testing';
import { ExampleService } from '../example.service';

export const CommandHandlers = [
  AddExampleCommandHandler,
  AddExampleRollbackCommandHandler
];
export const QueriesHandlers = [
  AuthCheckUsernameQueryHandler
];
describe('ExampleService', () => {
  let service: ExampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExampleService,
        CommandBus
      
      ]
    }).compile();

    service = module.get<ExampleService>(ExampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

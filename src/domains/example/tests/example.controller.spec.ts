import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { ExampleController } from '../example.controller';

describe('ExampleService', () => {
  let controller: ExampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [CommandBus,QueryBus]
    }).compile();

    controller = module.get<ExampleController>(ExampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

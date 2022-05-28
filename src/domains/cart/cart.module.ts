import { AccountModule } from './../account/account.module';
import { CartController } from './cart.controller';
import { CartEntity } from './entities/cart.entity';
import { AddCartCommandHandler } from './cqrs/commands/add-cart/add-cart.command-handler';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";


export const CommandHandlers = [
  AddCartCommandHandler
];
export const QueriesHandlers = [
];
export const EventHandlers = [
];

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity]),
    CqrsModule,
    AccountModule
  ],
  controllers: [CartController],
  providers: [
    CartController,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueriesHandlers],
  exports: [
    CartController,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueriesHandlers]
})


export class CartModule {
}

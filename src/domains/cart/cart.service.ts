import { AccountEntity } from './../account/entities/account.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: Repository<AccountEntity>
  ){

  }
  create() {
    return 'This action adds a new cart';
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update() {
    return `This action updates a # cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}

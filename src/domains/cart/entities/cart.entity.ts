import { AccountEntity } from './../../account/entities/account.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('carts')
export class CartEntity extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // Each account hast multiple account
    @ManyToOne(type => AccountEntity, account => account.carts)
    @JoinColumn({ referencedColumnName: "id", name: "account_id" })
    account: AccountEntity

    @ApiProperty()
    @Column({ default: null })
    cart_number: string

    @ApiProperty()
    @Column({ default: null })
    shaba_number: string

    @ApiProperty()
    @Column({ default: null })
    bank_name: string

    @ApiProperty()
    @Column({ default: null })
    expire_date: string

}
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { AggregateRoot } from "@nestjs/cqrs";
import { ApiProperty } from '@nestjs/swagger';

@Entity('accounts')
export class AccountEntity extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: false })
    is_deleted: boolean;

    @CreateDateColumn({ nullable: true })
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;

    toDto() {
        return {
        }
    }

}
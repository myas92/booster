import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { AggregateRoot } from "@nestjs/cqrs";
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class UserEntity extends AggregateRoot {
    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty()
    @Column()
    mobile_number: string

    @ApiProperty()
    @Column({ nullable: true })
    email: string;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty()
    @CreateDateColumn({ nullable: true })
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;

}
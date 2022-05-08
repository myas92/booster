import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { AggregateRoot } from "@nestjs/cqrs";
import { AuthVerificationTypeEnum } from "./auth-verification-type.enum";
import { ApiProperty } from '@nestjs/swagger';

@Entity('auth-verification')
export class AuthVerificationEntity extends AggregateRoot {
    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty()
    @Column()
    mobileNumber: string

    @ApiProperty()
    @Column({ nullable: true })
    email: string;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty()
    @Column({ nullable: true })
    type: AuthVerificationTypeEnum;

    @ApiProperty()
    @Column()
    verificationToken: string;

    @ApiProperty()
    @Column({ nullable: true })
    ip: string;

    @ApiProperty()
    @Column('boolean', { default: false })
    isUsed: boolean = false

    @ApiProperty()
    @CreateDateColumn({ nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;

}
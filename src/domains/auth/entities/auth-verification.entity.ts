import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { AggregateRoot } from "@nestjs/cqrs";
import { AuthVerificationTypeEnum } from "./auth-verification-type.enum";
import { ApiProperty } from '@nestjs/swagger';

@Entity('auth_verification')
export class AuthVerificationEntity extends AggregateRoot {
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
    @Column({ nullable: true })
    type: AuthVerificationTypeEnum;

    @ApiProperty()
    @Column()
    verify_code: string;

    @ApiProperty()
    @Column({ nullable: true })
    ip: string;

    @ApiProperty()
    @Column('boolean', { default: false })
    is_used: boolean = false

    @ApiProperty()
    @Column()
    total_resend_code: number;

    @ApiProperty()
    @CreateDateColumn({ nullable: true })
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;

}
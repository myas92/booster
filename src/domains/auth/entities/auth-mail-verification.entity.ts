import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { AggregateRoot } from "@nestjs/cqrs";
import { AuthVerificationTypeEnum } from "./auth-verification-type.enum";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class AuthMailVerificationEntity extends AggregateRoot {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    email: string;

    @Column()
    @ApiProperty()
    username: string;

    @Column()
    @ApiProperty()
    password: string;

    @ApiProperty()
    @Column({ nullable: true })
    type: AuthVerificationTypeEnum;

    @ApiProperty()
    @Column()
    verificationLink: string;

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
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { AggregateRoot } from "@nestjs/cqrs";
import { ApiProperty } from '@nestjs/swagger';

@Entity('auth_event')
export class AuthEventEntity extends AggregateRoot {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    mobile_number: string

    @Column({ nullable: true })
    status: number;

    @Column({ nullable: true })
    value: string;

    @Column({ nullable: true })
    message: string;

    @CreateDateColumn({ nullable: true })
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;

}
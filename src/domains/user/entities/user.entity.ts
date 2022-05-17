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
    @Column({ nullable: true })
    address: string;

    @ApiProperty()
    @Column({ nullable: true })
    avatar: string;

    @ApiProperty()
    @Column({ nullable: true })
    birthday: string;

    @ApiProperty()
    @Column({ default: 25 })
    commission: string;

    @ApiProperty()
    @Column({ nullable: true })
    face_image: string;

    @ApiProperty()
    @Column({ nullable: true })
    first_name: string;

    @ApiProperty()
    @Column({ nullable: true })
    last_name: string;

    @ApiProperty()
    @Column({ default: '****' })
    national_code: string;

    @ApiProperty()
    @Column({ nullable: true })
    invite_code: string;

    @ApiProperty()
    @Column({ nullable: true })
    phone_number: string;

    @ApiProperty()
    @Column({ nullable: true })
    tracking_id: string;

    @ApiProperty()
    @Column({ nullable: true })
    verification: string;

    @ApiProperty()
    @Column({ nullable: true })
    settings: string;

    @ApiProperty()
    @Column({ nullable: true })
    kyc_info: string;

    @ApiProperty()
    @Column({ nullable: true })
    status: string;

    @ApiProperty()
    @Column({ nullable: true })
    meta: string;

    @ApiProperty()
    @Column({ default: false })
    is_deleted: boolean;

    @ApiProperty()
    @CreateDateColumn({ nullable: true })
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;

}
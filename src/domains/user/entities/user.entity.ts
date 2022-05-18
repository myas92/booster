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

    @Column()
    password: string;

    @ApiProperty()
    @Column({ unique: true })
    referral_code: string;

    @ApiProperty()
    @Column({ nullable: true })
    email: string;

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
    role: string;

    @ApiProperty()
    @Column({ nullable: true })
    meta: string;

    @Column({ default: false })
    is_deleted: boolean;

    @CreateDateColumn({ nullable: true })
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;

    toDto(type = '') {
        return {
            id: this.id,
            mobile_number: this.mobile_number,
            referral_code: this.referral_code,
            email: this.email,
            address: this.address,
            status: this.status,
            photo: {
                path: (this.avatar) ? this.avatar : `upload/assets/default${type}.jpg`,
                name: (this.avatar) ? "" : "default"
            },
            role: this.role,
            birthday: this.birthday,
            commission: this.commission,
            face_image: this.face_image,
            first_name: this.first_name,
            last_name: this.last_name,
            national_code: this.national_code,
            invite_code: this.invite_code,
            phone_number: this.phone_number,
            tracking_id: this.tracking_id,
            verification: this.verification,
            settings: this.settings,
            kyc_info: this.kyc_info,
            meta: this.meta


        }
    }

}
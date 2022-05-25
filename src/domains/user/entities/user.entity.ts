import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { AggregateRoot } from "@nestjs/cqrs";
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class UserEntity extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty()
    @Column()
    mobile_number: string
    @ApiProperty()
    @Column({ default: 'UNFILLED' })
    status_mobile_number: string

    @Column()
    password: string;

    @ApiProperty()
    @Column({ unique: true })
    invite_code: string;

    @ApiProperty()
    @Column({ nullable: true })
    avatar: string;

    @ApiProperty()
    @Column({ nullable: true })
    email: string;
    @ApiProperty()
    @Column({ default: 'UNFILLED' })
    status_email: string;

    @ApiProperty()
    @Column({ nullable: true })
    address: string;
    @ApiProperty()
    @Column({ default: 'UNFILLED' })
    status_address: string;

    @ApiProperty()
    @Column({ nullable: true })
    birthday: string;
    @ApiProperty()
    @Column({ default: 'UNFILLED' })
    status_birthday: string;

    @ApiProperty()
    @Column({ default: 25 })
    commission: string;

    @ApiProperty()
    @Column({ nullable: true })
    face_image: string;
    @ApiProperty()
    @Column({ default: 'UNFILLED' })
    status_face_image: string;

    @ApiProperty()
    @Column({ nullable: true })
    first_name: string;
    @ApiProperty()
    @Column({ default: 'UNFILLED' })
    status_first_name: string;

    @ApiProperty()
    @Column({ nullable: true })
    last_name: string;
    @ApiProperty()
    @Column({ default: 'UNFILLED' })
    status_last_name: string;

    @ApiProperty()
    @Column({ default: '****' })
    national_code: string;
    @ApiProperty()
    @Column({ default: 'UNFILLED' })
    status_national_code: string;

    @ApiProperty()
    @Column({ nullable: true })
    national_card_image: string;
    @ApiProperty()
    @Column({ default: 'UNFILLED' })
    status_national_card_image: string;


    @ApiProperty()
    @Column({ nullable: true })
    phone_number: string;
    @ApiProperty()
    @Column({ default: 'UNFILLED' })
    status_phone_number: string;

    @ApiProperty()
    @Column({ nullable: true })
    tracking_id: string;

    @ApiProperty()
    @Column({ default: 'UNVERIFIED' })
    verification: string;

    @ApiProperty()
    @Column({ nullable: true })
    settings: string;

    @ApiProperty()
    @Column({ nullable: true })
    kyc_info: string;

    @ApiProperty()
    @Column({ nullable: true })
    role: string;

    @ApiProperty()
    @Column({ nullable: true })
    meta: string;

    @ApiProperty()
    @Column({ nullable: true })
    state: string;

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
            email: this.email,
            address: this.address,
            state: this.state,
            photo: {
                path: (this.avatar) ? this.avatar : `upload/assets/default${type}.jpg`,
                name: (this.avatar) ? "" : "default"
            },
            status: {
                address: this.status_address,
                email: this.status_email,
                face_image: this.status_face_image,
                first_name: this.status_first_name,
                last_name: this.status_last_name,
                mobile_number: this.status_mobile_number,
                national_card_image: this.status_national_card_image,
                national_code: this.status_national_code,
                phone_number: this.status_phone_number,
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
    toDtoUpdate() {
        return {
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            national_code: this.national_code,
            birthday: this.birthday
        }
    }

}
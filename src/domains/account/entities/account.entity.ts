import { Role } from './../../user/entities/enums/user-role.enum';
import { CartEntity } from './../../cart/entities/cart.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { AggregateRoot } from "@nestjs/cqrs";
import { ApiProperty } from '@nestjs/swagger';

@Entity('accounts')
export class AccountEntity extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    //relation with user
    @OneToOne(type => UserEntity, user => user.account)// one account => one user
    @JoinColumn({ referencedColumnName: "id", name: 'user_id' })
    user: UserEntity

    // Relation with Cart -> every Account hast multiple Carts
    @OneToMany(type => CartEntity, cart => cart.account, { nullable: true })
    carts: CartEntity[]

    @ApiProperty()
    @Column({ default: 'UNFILLED' })
    status_mobile_number: string

    @ApiProperty()
    @Column({ default: 'UNFILLED' })
    status_email: string;

    @ApiProperty()
    @Column({ nullable: true })
    avatar: string;


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
    @Column({ unique: true })
    invite_code: string;

    @Column({ default: false })
    is_deleted: boolean;

    @CreateDateColumn({ nullable: true })
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;

    toDto(role=Role.USER) {
        let privatePersonalInfo= {};
        if(role==Role.ADMIN){
            privatePersonalInfo = {
                face_image: this.face_image,
            }
        }
        return {
            id: this.id,
            mobile_number: this.user.mobile_number,
            email: this.user.email,
            carts: this.carts,
            address: this.address,
            invite_code: this.invite_code,
            photo: {
                path: (this.avatar) ? this.avatar : `upload/assets/default.jpg`,
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
            birthday: this.birthday,
            commission: this.commission,
            first_name: this.first_name,
            last_name: this.last_name,
            national_code: this.national_code,
            phone_number: this.phone_number,
            tracking_id: this.tracking_id,
            verification: this.verification,
            ...privatePersonalInfo,

        }
    }

}
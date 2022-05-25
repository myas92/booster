import { AccountEntity } from './../../account/entities/account.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, OneToOne } from "typeorm";
import { AggregateRoot } from "@nestjs/cqrs";
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class UserEntity extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // Relation with Account 
    @OneToOne(type => AccountEntity, userStatistics => userStatistics.user) //user => many links
    account: AccountEntity;

    @ApiProperty()
    @Column()
    mobile_number: string

    @ApiProperty()
    @Column({ nullable: true })
    email: string;

    @Column()
    password: string;

    @ApiProperty()
    @Column({ nullable: true })
    role: string;

    @ApiProperty()
    @Column({ unique: true })
    invite_code: string;

    @ApiProperty()
    @Column({ nullable: true })
    settings: string;

    @ApiProperty()
    @Column({ nullable: true })
    kyc_info: string;

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
            state: this.state,
            role: this.role,
            settings: this.settings,
            kyc_info: this.kyc_info,
            meta: this.meta

        }
    }
    toDtoUpdate() {
    }

}
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {AggregateRoot} from "@nestjs/cqrs";


export enum AuthVerificationTypeEnum{
    Register="Register",
    ForgetPassword="ForgetPassword"
}
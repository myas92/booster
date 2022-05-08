import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {AggregateRoot} from "@nestjs/cqrs";


export enum ExampleGenderTypeEnum{
    Register="Male",
    ForgetPassword="Female"
}
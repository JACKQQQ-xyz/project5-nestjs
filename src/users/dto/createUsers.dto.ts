import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class createUsersDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    role: string

    createdAt?: string
}
import { IsEmail, IsString } from "class-validator";

export class userDto{
    @IsString()
    name: string

    @IsString()
    avatarPath:string

    @IsString()
    city: string

    @IsEmail()
    email: string

    @IsString()
    isVerified: boolean
}
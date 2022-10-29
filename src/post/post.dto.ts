import { IsString } from "class-validator"

export class postDto {
    
    @IsString()
    content: string
    
    @IsString()
    image?: string


}
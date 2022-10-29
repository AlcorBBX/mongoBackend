import { IsString } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";

export class messageDto{
    @IsString()
    text: string

    @IsObjectId()
    userToId: string
}
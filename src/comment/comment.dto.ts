import { IsString } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";

export class commentDto{
    @IsString()
    message: string

    @IsObjectId()
    postId: string
}
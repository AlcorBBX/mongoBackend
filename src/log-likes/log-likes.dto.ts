import { IsObjectId } from "class-validator-mongo-object-id"

export class logLikesDto {
    @IsObjectId()
    postId: string
}
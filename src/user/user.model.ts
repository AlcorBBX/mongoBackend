import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface UserModel extends Base { }

export class UserModel extends TimeStamps {
    @prop({ unique: true })
    email: string

    @prop()
    name: string

    @prop({ default: false })
    isVerified: boolean

    @prop()
    avatarPath: string

    @prop()
    city: string

    @prop({ default: [], ref: () => UserModel })
    friends: Ref<UserModel>[]
}
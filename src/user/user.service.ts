import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ModelType } from "@typegoose/typegoose/lib/types"
import { Types } from "mongoose"
import { InjectModel } from "nestjs-typegoose"
import { userDto } from "./user.dto"
import { UserModel } from "./user.model"

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel)
        private readonly userModel: ModelType<UserModel>,
    ) { }

    async getUser(_id: Types.ObjectId) {
        return this.userModel.aggregate()
            .match({ _id })
            .lookup({
                from: 'Post',
                foreignField: 'user',
                localField: '_id',
                as: 'posts'
            })
            .addFields({
                postCount: {
                    $size: 'posts'
                }
            })
            .project({ __v: 0, posts: 0 })
            .exec()
            .then((data) => data[0])
    }

    async byId(_id: Types.ObjectId) {
        const user = await this.userModel.findById(_id, '-__v')
        if (!user) throw new UnauthorizedException('User not found')

        return user
    }

    async updateProfile(_id: Types.ObjectId, dto: userDto){
        const user = await this.byId(_id)

        // const isSameUser = await this.userModel.findOne({email: dto.email})
        // if(isSameUser && String(_id) !== String(isSameUser._id)){
        //     throw new NotFoundException('Email is busy')
        // }

        user.name = dto.name
        user.city = dto.city
        user.avatarPath = dto.avatarPath

        return await user.save()
    }
    // //by-id
    // async byId(id: number) {
    //     const user = await this.userModel.findOne({
    //         where: {
    //             id
    //         },
    //         relations: {
    //             subscriptions: {
    //                 toUser: true
    //             }
    //         },
    //         order: {
    //             createAt: 'DESC'
    //         }
    //     })
    //     if (!user) throw new NotFoundException('Пользователь не найден!')
    //     return user
    // }

    // //update
    // async updateProfile(id: number, dto: userDto) {
    //     const user = await this.byId(id)

    //     const isSameUser = await this.userModel.findOneBy({ email: dto.email })
    //     if (isSameUser && id !== isSameUser.id) throw new BadRequestException('Email занят!')

    //     if (dto.password) {
    //         const salt = await genSalt(10)
    //         user.password = await hash(dto.password, salt)
    //     }

    //     user.email = dto.email
    //     user.name = dto.name
    //     user.description = dto.description
    //     user.avatarPath = dto.avatarPath

    //     return this.userModel.save(user)
    // }

    // //subscribe
    // async subscribe(id: number, userId: number) {
    //     const data = {
    //         toUser: { id: userId },
    //         fromUser: { id }
    //     }
    //     const isSubscribed = await this.subscriptionRepository.findOneBy(data)

    //     if (!isSubscribed) {
    //         const newSubscription = await this.subscriptionRepository.create(data)
    //         await this.subscriptionRepository.save((newSubscription))

    //         return true
    //     }

    //     await this.subscriptionRepository.delete(data)
    //     return false
    // }

    // //getAll
    // async getAll() {
    //     return this.userModel.find()
    // }
}
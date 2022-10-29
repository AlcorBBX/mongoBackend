import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { postDto } from './post.dto';
import { PostModel } from './post.model';

@Injectable()
export class PostService {
    constructor(
        @InjectModel(PostModel)
        private readonly postModel: ModelType<PostModel>
    ) { }

    async getAll() {
        return this.postModel.find()
            .select('-__v')
            .populate('user', 'avatarPath name isVerified')
            .exec()
    }

    async byUserId(userId: Types.ObjectId) {
        return this.postModel.find({ user: userId })
            .select('-__v')
            .populate('user', 'avatarPath name isVerified')
            .exec()
    }

    async create(userId: Types.ObjectId, { image, content }: postDto) {
        return this.postModel.create({ image, content })
    }

    async delete(id: Types.ObjectId){
        const deletePost = await this.postModel.findByIdAndDelete(id).exec()
        if(!deletePost) throw new NotFoundException('Пост не найден')
        return deletePost
    }
}

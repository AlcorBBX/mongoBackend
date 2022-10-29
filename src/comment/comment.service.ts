import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { commentDto } from './comment.dto';
import { CommentModel } from './comment.model';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(CommentModel)
        private readonly commentModel: ModelType<CommentModel>
    ) { }

    async byPostId(postId: Types.ObjectId) {
        return this.commentModel.find({ post: postId }, '-__v')
            .sort({ createAt: 'desc' })
            .populate('user', 'avatarPath name isVerified')
            .exec()
    }

    async create(userId: Types.ObjectId, dto: commentDto){
        return this.commentModel.create({
            message: dto.message,
            post: dto.postId,
            user: userId
        })
    }
}

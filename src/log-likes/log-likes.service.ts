import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { LogLikesModel } from './log-likes.model';

@Injectable()
export class LogLikesService {
    constructor(
        @InjectModel(LogLikesModel)
        private readonly logLikesModel: ModelType<LogLikesModel>
    ) { }

    async checkExist(userId: Types.ObjectId, postId: Types.ObjectId) {
        return this.logLikesModel.exists({
            post: postId,
            user: userId
        }).exec()
    }

    async getAllCount(postId: Types.ObjectId) {
        return this.logLikesModel.find({post: postId}).count().exec()
    }

    async create(userId: Types.ObjectId, postId: Types.ObjectId) {
        return this.logLikesModel.create({
            post: postId,
            user: userId
        })
    }

    async delete(userId: Types.ObjectId, postId: Types.ObjectId) {
        return this.logLikesModel.findOneAndDelete({
            post: postId,
            user: userId
        }).exec()
    }
}

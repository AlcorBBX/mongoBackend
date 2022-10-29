import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { messageDto } from './message.dto';
import { MessageModel } from './message.model';

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(MessageModel)
        private readonly messageModel: ModelType<MessageModel>
    ) { }

    async byUserFromId(userFromId: Types.ObjectId) {
        return this.messageModel.find({
            userFrom: userFromId,
        })
            .populate('userFrom', 'name avatarPath')
            .populate('userTo', 'name avatarPath')
            .exec()
    }

    async byUserToId(userFromId: Types.ObjectId, userToId: Types.ObjectId) {
        return this.messageModel.find({
            userFrom: userFromId,
            userTo: userToId
        })
            .populate('userFrom', 'avatarPath')
            .populate('userTo', 'avatarPath')
            .exec()
    }

    async create(userFromId: Types.ObjectId, { userToId, text }: messageDto) {
        return this.messageModel.create({
            userFrom: userFromId,
            userTo: userToId
        })
    }

    async delete(id: Types.ObjectId) {
        const deleteMessage = await this.messageModel.findByIdAndDelete(id).exec()
        if (!deleteMessage) throw new NotFoundException('Сообщение не найдено')
        return deleteMessage
    }
}

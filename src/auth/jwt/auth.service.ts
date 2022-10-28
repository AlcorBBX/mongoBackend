import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from 'src/user/user.model';
import { IResGoogleProfile } from 'src/utils/types/google-profile.interface';
import { JwtService } from '@nestjs/jwt'
import { GoogleCodeDto } from './dto/google-code.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
        private jwtService: JwtService,
        private httpService: HttpService
    ) { }

    async validateUser(details: IResGoogleProfile) {
        const { email } = details
        const user = await this.UserModel.findOne({ email })
        if (!user) {
            return this.UserModel.create(details)
        }
        return user
    }

    async issueAccessToken(userId: string) {
        const data = { _id: userId }

        return await this.jwtService.signAsync(data, {
            expiresIn: '31d'
        })
    }

    googleLogin({ code }: GoogleCodeDto) {
        if (!code) {
            throw new NotFoundException('Google code is not found')
        }

        return {

        }
    }

    googleLogout(req) {
        req.logout()
        return
    }
}

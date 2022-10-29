import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from 'src/user/user.model';
import { IResGoogleProfile } from 'src/utils/types/google-profile.interface';
import { JwtService } from '@nestjs/jwt'
import { GoogleCodeDto } from './dto/google-code.dto';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
        private readonly jwtService: JwtService,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
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

    async getGoogleToken(code: string): Promise<GoogleCodeDto> {
        return firstValueFrom(
            this.httpService.post('https://oauth2.googleapis.com/token', {
                code,
                client_id: this.configService.get('GOOGLE_CLIENT_ID'),
                client_secret: this.configService.get('GOOGLE_SECRET'),
                redirect_uri: 'http://localhost:3000',
                grand_type: 'authorization_code'
            }).pipe(map((res) => res.data))
        )
    }

    async googleLogin({ code }: GoogleCodeDto) {
        if (!code) {
            throw new NotFoundException('Google code is not found')
        }
        try {
            const data = await this.getGoogleToken(code)
        }
        catch (e) {
            throw new UnprocessableEntityException(e)
        }

        return
    }

    googleLogout(req) {
        req.logout()
        return
    }
}

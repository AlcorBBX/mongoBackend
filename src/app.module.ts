import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getMongoConfig } from './config/mongo.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/jwt/auth.module';
import { CommentModule } from './comment/comment.module';
import { LogLikesModule } from './log-likes/log-likes.module';
import { MessageModule } from './message/message.module';
import { PostModule } from './post/post.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    PassportModule.register({ session: true }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig
    }),
    UserModule,
    CommentModule,
    LogLikesModule,
    MessageModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostModel } from './post.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: PostModel,
        schemaOptions: {
          collection: 'Post'
        }
      }])]
})
export class PostModule { }

// src/post/post.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';

@Resolver('Post')
export class PostsResolver {
  constructor(private postService: PostsService) {}

  @Query('posts')
  getPosts() {
    return this.postService.findAll();
  }

  @Query('post')
  getPost(@Args('id') id: number) {
    return this.postService.findOne(id);
  }

  @Mutation('createPost')
  createPost(
    @Args('title') title: string,
    @Args('content') content: string,
    @Args('published') published: boolean,
  ) {
    return this.postService.createPost({ title, content, published });
  }

  @Mutation('updatePost')
  updatePost(
    @Args('id') id: number,
    @Args('title') title: string,
    @Args('content') content: string,
    @Args('published') published: boolean,
  ) {
    return this.postService.updatePost({ id, title, content, published });
  }

  @Mutation('deletePost')
  deletePost(@Args('id') id: number) {
    return this.postService.deletePost(id);
  }
}

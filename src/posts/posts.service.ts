// src/post/post.service.ts
import { Injectable } from '@nestjs/common';
import { Post } from './posts.model';
import { PrismaService } from 'src/prisma.service';
import { CreatePostInput } from './dto/create-post-input.dto';
import { UpdatePostInput } from './dto/update-post-input.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  findOne(id: number): Promise<Post> {
    return this.prisma.post.findUnique({ where: { id } });
  }

  createPost(data: CreatePostInput): Promise<Post> {
    return this.prisma.post.create({ data });
  }

  async updatePost(data: UpdatePostInput): Promise<Post> {
    // validation
    return this.prisma.post.update({ where: { id: data.id }, data });
  }

  async deletePost(id: number) {
    // validation
    return await this.prisma.post.delete({ where: { id } });
  }
}

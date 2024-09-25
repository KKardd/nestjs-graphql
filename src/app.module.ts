import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PrismaService } from './prisma.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CommentsModule } from './comments/comments.module';
import { makeSchema } from 'nexus';
import { User } from './users/user.model';
import { Post } from './posts/posts.model';
import { Comment } from './comments/comment.model';

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // Code First
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // 자동으로 스키마 생성

      // Schema First
      // typePaths: ['./**/*.gql'],

      // Nexus
      schema: makeSchema({
        types: [User, Post, Comment],
        outputs: {
          typegen: join(__dirname, '..', 'nexus-typegen.ts'),
          schema: join(__dirname, '..', 'schema.graphql'),
        },
        contextType: {
          module: join(__dirname, './context.js'),
          export: 'Context',
        },
      }),

      installSubscriptionHandlers: true,
    }),
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

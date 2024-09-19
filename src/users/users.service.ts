import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput } from './dto/create-user-input.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUserInput) {
    return this.prisma.user.create({ data });
  }

  async update(id: number, data: CreateUserInput) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}

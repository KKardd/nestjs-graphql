import { PrismaService } from './prisma.service';

export interface Context {
  prisma: PrismaService;
}

export const createContext = (prisma: PrismaService): Context => ({
  prisma,
});

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@repo/database';

@Injectable()
export class AppService {
  private prisma = new PrismaClient();

  getHello(): string {
    return 'Hello World!';
  }
}

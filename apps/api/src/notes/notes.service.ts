import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
// Import PrismaClient từ gói dùng chung của mình
import { PrismaClient } from '@repo/database';

@Injectable()
export class NotesService {
  // Khởi tạo kết nối DB
  private prisma = new PrismaClient();

  // 1. Tạo Note mới (Create)
  async create(createNoteDto: CreateNoteDto) {
    return this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        content: createNoteDto.content,
      },
    });
  }

  // 2. Lấy danh sách Note (Read)
  async findAll() {
    // Sắp xếp bài mới nhất lên đầu (desc)
    return this.prisma.note.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // 3. Lấy chi tiết 1 Note
  async findOne(id: string) {
    return this.prisma.note.findUnique({ where: { id } });
  }

  // 4. Cập nhật Note
  async update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.prisma.note.update({
      where: { id },
      data: updateNoteDto,
    });
  }

  // 5. Xóa Note
  async remove(id: string) {
    return this.prisma.note.delete({ where: { id } });
  }
}

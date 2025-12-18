import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Mở CORS để Frontend (chạy port 3000) gọi được
  app.enableCors({
    origin: 'http://localhost:3000', // Chỉ cho phép Frontend của mình gọi
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 2. Đổi port server sang 4000 (tránh trùng port 3000 của Next.js)
  await app.listen(4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();

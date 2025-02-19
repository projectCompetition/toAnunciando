import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Permite chamadas do React
  app.use((req, res, next) => {
    if (req.path === '/login') {
      res.redirect('http://localhost:3000/login');
    } else {
      next();
    }
  });

  await app.listen(3001);
}
bootstrap();

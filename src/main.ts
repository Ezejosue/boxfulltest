import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.enableCors();
  
  // Configurar ValidationPipe global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no decoradas
      transform: true, // Transforma los payloads automáticamente
      forbidNonWhitelisted: true, // Rechaza propiedades no decoradas
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

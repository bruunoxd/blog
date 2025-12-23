import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { config } from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilita CORS
  app.enableCors();
  
  // Habilita validação global
 // app.useGlobalPipes(
    //new ValidationPipe({
   //   whitelist: true,
     // forbidNonWhitelisted: true,
     // transform: true,
   // }),
  //);
  
  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API-BLOG-SCHOOL')
    .setDescription('The blog school description')
    .setVersion('1.0')
    .addTag('posts')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 


  await app.listen(3000, '0.0.0.0');

  console.log(`Application is running on: http://localhost:3000`);
  console.log(`Swagger documentation: http://localhost:3000/api`);
}
bootstrap();

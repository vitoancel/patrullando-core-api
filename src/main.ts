import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ 
        origin: ['http://192.168.31.190:9636'], 
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
        credentials: true, 
    });
  await app.listen(process.env.PORT ?? 3000); 
}
bootstrap();

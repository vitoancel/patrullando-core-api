import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { UserEntity } from './user/entities/user.entity';

@Module({
  imports: [
    UsuarioModule, 
    AuthModule, 
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Lezama26+',
      database: 'patrullando_db',
      entities: [UserEntity],
      autoLoadEntities: true,
      synchronize: true,
    }),
    DatabaseModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}

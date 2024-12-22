import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from './permission/permission.module';
import { UserRoleModule } from './user-role/user-role.module';
import { RoleModule } from './role/role.module';
import { PlanModule } from './plan/plan.module';

@Module({
  imports: [
    AuthModule, 
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Lezama26+',
      database: 'patrullando_db',
      entities: [
        //__dirname + '/../**/*.entity.ts',
        //UserEntity,RoleEntity,PermissionEntity,
        'dist/**/*.entity.js'
      ],
      synchronize: true,
    }),
    PermissionModule,
    UserRoleModule,
    RoleModule,
    PlanModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}

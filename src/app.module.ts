import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { PlanModule } from './plan/plan.module';
import { ExamModule } from './exam/exam.module';
import { ExamMasterModule } from './exam-master/exam-master.module';
import { QuestionModule } from './question/question.module';
import { OptionModule } from './option/option.module';
import { QuestionMasterModule } from './question-master/question-master.module';
import { CategoryModule } from './category/category.module';
import { PracticeModule } from './practice/practice.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'; //
import { FormatsModule } from './formats/formats.module';

@Module({
  imports: [
    AuthModule, 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Ruta absoluta a la carpeta de archivos estáticos
      // Por defecto, los archivos se servirán desde la raíz del servidor (ej. http://localhost:3000/index.html)
      // Si quieres un prefijo, puedes usar 'serveRoot'
      // serveRoot: '/static/', // Los archivos se servirán desde http://localhost:3000/static/index.html
    }),    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db.patrullando.pe',
      //port: 5432,
      username: 'admin_db',
      password: 'P@t4ull@nd0_s3rv3r',
      database: 'patrullando_db',
      entities: [
        //__dirname + '/../**/*.entity.ts',
        //UserEntity,RoleEntity,PermissionEntity,
        'dist/**/*.entity.js'
      ],
      synchronize: true,
    }),
    UserModule,
    PermissionModule,
    RoleModule,
    PlanModule,
    ExamModule,
    ExamMasterModule,
    QuestionModule,
    OptionModule,
    QuestionMasterModule,
    CategoryModule,
    PracticeModule,
    FormatsModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}

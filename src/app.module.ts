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
import { RoleHistoryModule } from './role-history/role-history.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Ruta absoluta a la carpeta de archivos estáticos
      // Por defecto, los archivos se servirán desde la raíz del servidor (ej. http://localhost:3000/index.html)
      // Si quieres un prefijo, puedes usar 'serveRoot'
      // serveRoot: '/static/', // Los archivos se servirán desde http://localhost:3000/static/index.html
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('DB_TYPE') as 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE') as string,
        entities: ['dist/**/*.entity.js'],
        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
      }),
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
    FormatsModule,
    RoleHistoryModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}

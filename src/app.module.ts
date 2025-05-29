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
import { ExamModule } from './exam/exam.module';
import { ExamMasterModule } from './exam-master/exam-master.module';
import { QuestionModule } from './question/question.module';
import { OptionModule } from './option/option.module';
import { QuestionMasterModule } from './question-master/question-master.module';
import { CategoryModule } from './category/category.module';
import { PracticeModule } from './practice/practice.module';

@Module({
  imports: [
    AuthModule, 
    UserModule,
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
    PermissionModule,
    UserRoleModule,
    RoleModule,
    PlanModule,
    ExamModule,
    ExamMasterModule,
    QuestionModule,
    OptionModule,
    QuestionMasterModule,
    CategoryModule,
    PracticeModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}

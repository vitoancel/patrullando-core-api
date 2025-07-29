import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { QuestionEntity } from '../../question/entities/question.entity';
import { ExamMasterEntity } from 'src/exam-master/entities/exam-master.entity';
import { Transform } from 'class-transformer';

@Entity({ name: 'tb_exam' })
export class ExamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: true })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_date: Date;

  @Column({ type: 'integer', nullable: true })
  duration: number;

  @Column({ type: 'smallint', default: 1 })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creation_date: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_date: Date;

  @Column({ type: 'integer', nullable: true })
  user_id: number;

  @Column({ type: 'integer', nullable: false, default: 55 })
  min_score: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'integer', default: 0 })
  score: number;

  @Column({ type: 'integer', default: 0 })
  pending_questions: number;

  @Column({ type: 'integer', default: 0 })
  correct_questions: number;

  @Column({ type: 'integer', default: 0 })
  incorrect_questions: number;

  @Index('master_id_exam')
  @ManyToOne(() => ExamMasterEntity)
  @JoinColumn({ name: 'master_id' })
  master: ExamMasterEntity;

  @OneToMany(() => QuestionEntity, (question) => question.exam) // Add this line
  questions: QuestionEntity[]; // Add this line
}

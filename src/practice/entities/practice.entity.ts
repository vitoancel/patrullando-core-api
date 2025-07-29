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
import { ExamMasterEntity } from 'src/exam-master/entities/exam-master.entity';
import { ExamEntity } from 'src/exam/entities/exam.entity';

@Entity({ name: 'tb_practice' })
export class PracticeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'exam_id', nullable: true })
  exam_id: number;

  @Column({ name: 'user_id', nullable: true })
  user_id: number;

  @Column({ name: 'exam_master_id', nullable: true })
  exam_master_id: number;

  @ManyToOne(() => ExamEntity)
  @JoinColumn({ name: 'exam_id' })
  exam: ExamEntity;

  @ManyToOne(() => ExamMasterEntity)
  @JoinColumn({ name: 'exam_master_id' })
  exam_master: ExamMasterEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}

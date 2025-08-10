import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ExamMasterEntity } from '../../exam-master/entities/exam-master.entity';

@Entity('tb_exam_master_category')
export class ExamMasterCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CategoryEntity, (category) => category.examMasterCategories)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @Column({ type: 'integer' })
  num_question: number;

  @ManyToOne(
    () => ExamMasterEntity,
    (examMaster) => examMaster.examMasterCategories,
  )
  @JoinColumn({ name: 'exam_master_id' })
  examMaster: ExamMasterEntity;
}

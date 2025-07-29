import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuestionMasterEntity } from '../../question-master/entities/question-master.entity'; // Assuming you have this entity
import { ExamEntity } from '../../exam/entities/exam.entity'; // Assuming you have this entity
import { CategoryEntity } from '../../category/entities/category.entity'; // Assuming you have this entity
import { OptionEntity } from '../../option/entities/option.entity'; // Assuming you have this entity

@Entity('tb_question')
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('master_id')
  @ManyToOne(() => QuestionMasterEntity)
  @JoinColumn({ name: 'master_id' })
  master: QuestionMasterEntity;

  @Index('exam_id')
  @ManyToOne(() => ExamEntity)
  @JoinColumn({ name: 'exam_id' })
  exam: ExamEntity;

  @Column({ type: 'text' })
  statement: string;

  @Column({ type: 'smallint', default: 1 })
  question_type: number;

  @Column({ type: 'integer', nullable: true })
  score: number;

  @Column({ type: 'smallint', default: 1 })
  status: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creation_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_date: Date;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @Column({ type: 'integer', nullable: true })
  order_num: number;

  @OneToMany(() => OptionEntity, (option) => option.question) // Add this line
  options: OptionEntity[]; // Add this line

  @Column({ type: 'text', default: '', nullable: false })
  theory_helps: string;

  @Column({ type: 'varchar', default: '0', length: 255, nullable: false })
  ref_code: string;
}

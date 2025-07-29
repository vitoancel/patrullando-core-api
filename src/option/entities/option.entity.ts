import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { QuestionEntity } from '../../question/entities/question.entity'; // Assuming you have this entity

@Entity('tb_option')
export class OptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('question_id_option')
  @ManyToOne(() => QuestionEntity)
  @JoinColumn({ name: 'question_id' })
  question: QuestionEntity;

  @Column({ type: 'text', nullable: true })
  option_text: string;

  @Column({ type: 'smallint', nullable: true })
  is_correct: number;

  @Column({ type: 'smallint', default: 0 })
  is_marked: number;

  @Column({ type: 'integer', default: 1 })
  points: number;

  @Column({ type: 'integer', nullable: true })
  order_num: number;
}

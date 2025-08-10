import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionMasterEntity } from '../../question-master/entities/question-master.entity';

@Entity('tb_option_master')
export class OptionMasterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('question_id')
  @ManyToOne(() => QuestionMasterEntity)
  @JoinColumn({ name: 'question_id' })
  questionMaster: QuestionMasterEntity;

  @Column({ type: 'text' })
  option_text: string;

  @Column({ type: 'smallint' })
  is_correct: number;

  @Column({ type: 'integer', default: 1 })
  points: number;
}

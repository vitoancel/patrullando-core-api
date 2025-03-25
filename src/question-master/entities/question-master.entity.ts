import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CategoryEntity } from '../../category/entities/category.entity'; // Assuming you have this entity

@Entity('tb_question_master')
export class QuestionMasterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('category_id_2')
  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @Column({ type: 'text' })
  statement: string;

  @Column({ type: 'smallint', default: 1 })
  question_type: number;

  @Column({ type: 'integer' })
  score: number;

  @Column({ type: 'smallint', default: 1 })
  status: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creation_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_date: Date;
}

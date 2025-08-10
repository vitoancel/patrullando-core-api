import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '../../category/entities/category.entity'; // Assuming you have this entity
import { OptionMasterEntity } from '../../option-master/entities/option-master.entity';

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

  @Column({ type: 'integer', default: 1 })
  score: number;

  @Column({ type: 'smallint', default: 1 })
  status: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creation_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_date: Date;

  @Column({ type: 'text', default: '', nullable: false })
  theory_helps: string;

  @Column({ type: 'varchar', default: '0', length: 255, nullable: false })
  ref_code: string;

  @OneToMany(() => OptionMasterEntity, (option) => option.questionMaster)
  options: OptionMasterEntity[];
}

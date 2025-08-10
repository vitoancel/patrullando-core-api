import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ExamMasterCategoryEntity } from './exam-master-category.entity';

@Entity('tb_category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'smallint', default: 1 })
  status: number;

  @Column({ type: 'smallint', default: 1 })
  category_type: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creation_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_date: Date;

  @OneToMany(
    () => ExamMasterCategoryEntity,
    (examMasterCategory) => examMasterCategory.category,
  )
  examMasterCategories: ExamMasterCategoryEntity[];
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '../../category/entities/category.entity';

@Entity({ name: 'tb_format' })
export class FormatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'text', nullable: false })
  file_url: string;

  @CreateDateColumn({ type: 'timestamp', name: 'creation_date' })
  creation_date: Date;

  @Column({ type: 'int', nullable: true, name: 'created_user' })
  created_user: number;

  @UpdateDateColumn({ type: 'timestamp', nullable: true, name: 'update_date' })
  update_date: Date;

  @Column({ type: 'int', nullable: true, name: 'update_user' })
  update_user: number;

  @Column({ type: 'int', nullable: false })
  category_id: number;

  @ManyToOne(() => CategoryEntity, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  get category_name(): string {
    if (this.category == undefined) {
      return null;
    }
    return this.category.name;
  }
}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'tb_exam_master' })
export class ExamMasterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'integer', nullable: true })
  duration: number;

  @Column({ type: 'smallint', default: 1 })
  status: number;

  @Column({ type: 'integer', nullable: false, default: 55   })
  min_score: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  creation_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  update_date: Date;
}

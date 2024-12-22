import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'tb_plan' })
export class PlanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'integer', default: 1 })
  type_currency: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'integer', default: 1 })
  color: number;

  @Column({ type: 'integer', default: 1 })
  status: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  creation_date: Date;

  @Column({ type: 'integer', nullable: true })
  creation_user: number;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  update_date: Date;

  @Column({ type: 'integer', nullable: true })
  update_user: number;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletion_date: Date;

  @Column({ type: 'integer', nullable: true })
  deletion_user: number;
}

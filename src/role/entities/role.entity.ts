import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_role' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 255 })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 1 })
  status: number;

  @CreateDateColumn({ type: 'timestamp' })
  creation_date: Date;

  @Column({ nullable: true })
  creation_user: number;

  @UpdateDateColumn({ type: 'timestamp' })
  update_date: Date;

  @Column({ nullable: true })
  update_user: number;

  @Column({ type: 'timestamp', nullable: true })
  deletion_date: Date;

  @Column({ nullable: true })
  deletion_user: number;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_permission' })
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 255 })
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  creation_date: Date;

  @Column({ nullable: true })
  creation_user: number;
}

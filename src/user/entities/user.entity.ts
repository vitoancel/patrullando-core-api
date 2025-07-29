import { RoleEntity } from 'src/role/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'tb_user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 255 })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ unique: true, length: 36 })
  phone_number: string;

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

  @Column({ nullable: false })
  role_id: number;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  get status_name(): string {
    switch (this.status) {
      case 1:
        return 'ACTIVO';
      case 0:
        return 'INACTIVO';
      default:
        return 'DESCONOCIDO';
    }
  }

  get suscription_type(): string {
    return this.role ? this.role.name : null;
  }

  get suscription_type_id(): number {
    return this.role ? this.role.id : null;
  }

  get suscription_detail(): string {
    return this.role ? this.role.description : null;
  }
}

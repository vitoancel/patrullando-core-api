import { RoleEntity } from 'src/role/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { QuestionEntity } from '../../question/entities/question.entity';
import { RoleHistoryEntity } from '../../role-history/entities/role-history.entity';

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

  @OneToMany(() => RoleHistoryEntity, (role_history) => role_history.user) // Add this line
  role_history: RoleHistoryEntity[];

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
    if (!this.role) {
      return null;
    }
    return this.role.name;
  }

  get suscription_since(): Date {
    if (!this.role_history.length) {
      return null;
    }
    return this.role_history.find((x) => x.status == 1).start_date;
  }

  get suscription_until(): Date {
    if (!this.role_history.length) {
      return null;
    }

    const role_hisotry = this.role_history.find((x) => x.status == 1)

    return role_hisotry.end_date;
  }

  get suscription_type_id(): number {
    const role_history = this.role_history.find((x) => x.status == 1);

    if (role_history == undefined) {
      return null;
    }

    return role_history.plan ? role_history.plan.id : null;
  }

  get suscription_detail(): string {
    const role_history = this.role_history.find((x) => x.status == 1);

    if (role_history == undefined) {
      return null;
    }

    return role_history.plan ? role_history.plan.description : null;
  }
}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { RoleEntity } from '../../role/entities/role.entity';

@Entity({ name: 'tb_user_role' })
export class UserRoleEntity {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  role_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  creation_date: Date;

  @Column({ nullable: true })
  creation_user: number;

  // Relaciones con las entidades User y Role
  @ManyToOne(() => UserEntity, (user) => user.userRoles)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.userRoles)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;
}

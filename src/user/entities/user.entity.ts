import { UserRoleEntity } from 'src/user-role/entities/user-role.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

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

  // Relación con UserRoleEntity
  @OneToMany(() => UserRoleEntity, (userRole) => userRole.user)
  userRoles: UserRoleEntity[];
}

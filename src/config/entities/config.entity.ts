import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_config' })
export class ConfigEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  group: string;

  @Column({ type: 'text', nullable: false })
  code: string;

  @Column({ type: 'text', nullable: false })
  value: string;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'smallint', default: 1 })
  status: number;
}

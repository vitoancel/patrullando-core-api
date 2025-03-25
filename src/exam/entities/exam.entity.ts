import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn ,ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { QuestionEntity } from '../../question/entities/question.entity';
@Entity({ name: 'tb_exam' })
export class ExamEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'timestamp', nullable: true })
    start_date: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    end_date: Date;
  
    @Column({ type: 'integer', nullable: true })
    duration: number;
  
    @Column({ type: 'smallint', default: 1 })
    status: number;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creation_date: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    update_date: Date;
  
    @Column({ type: 'integer', nullable: true  })
    user_id: number;
  
    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
  
    @Column({ type: 'integer', default: 0 })
    score: number;
  
    @Column({ type: 'integer', default: 0 })
    pending_questions: number;
  
    @Column({ type: 'integer', default: 0 })
    correct_questions: number;
  
    @Column({ type: 'integer', default: 0 })
    incorrect_questions: number;

    @OneToMany(() => QuestionEntity, (question) => question.exam) // Add this line
    questions: QuestionEntity[]; // Add this line
  }

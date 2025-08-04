import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RoleHistoryEntity } from './entities/role-history.entity';
import { CreateRoleHistoryDto } from './dto/create-role-history.dto';
import { UpdateRoleHistoryDto } from './dto/update-role-history.dto';

@Injectable()
export class RoleHistoryService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(RoleHistoryEntity)
    private roleHistoryRepository: Repository<RoleHistoryEntity>,
  ) {}

  async create(
    createRoleHistoryDto: CreateRoleHistoryDto,
  ): Promise<RoleHistoryEntity> {
    const roleHistory = this.roleHistoryRepository.create(createRoleHistoryDto);
    return this.roleHistoryRepository.save(roleHistory);
  }

  async findAll(): Promise<RoleHistoryEntity[]> {
    return this.roleHistoryRepository.find({
      relations: ['user', 'role', 'plan'],
    });
  }

  async findOne(id: number): Promise<RoleHistoryEntity> {
    const roleHistory = await this.roleHistoryRepository.findOne({
      where: { id },
      relations: ['user', 'role', 'plan'],
    });

    if (!roleHistory) {
      throw new NotFoundException(`Role history with ID ${id} not found`);
    }

    return roleHistory;
  }

  async update(
    id: number,
    updateRoleHistoryDto: UpdateRoleHistoryDto,
  ): Promise<RoleHistoryEntity> {
    const roleHistory = await this.findOne(id);

    Object.assign(roleHistory, updateRoleHistoryDto);

    return this.roleHistoryRepository.save(roleHistory);
  }

  async remove(id: number): Promise<void> {
    const result = await this.roleHistoryRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Role history with ID ${id} not found`);
    }
  }

  async createWithStatusUpdate(
    createRoleHistoryDto: CreateRoleHistoryDto,
  ): Promise<RoleHistoryEntity> {
    console.log('createWithStatusUpdate');
    // Set all existing role history records for this user to inactive (status=0)
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Update all existing role history records for this user to inactive
      await queryRunner.manager.query(
        'UPDATE tb_role_history SET status = 0 WHERE user_id = $1',
        [createRoleHistoryDto.user_id],
      );

      console.log('end createWithStatusUpdate');
      // Create the new role history record
      const roleHistory =
        this.roleHistoryRepository.create(createRoleHistoryDto);
      const savedRoleHistory =
        await this.roleHistoryRepository.save(roleHistory);

      await queryRunner.commitTransaction();
      return savedRoleHistory;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}

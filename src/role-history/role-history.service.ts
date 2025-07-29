import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleHistoryEntity } from './entities/role-history.entity';
import { CreateRoleHistoryDto } from './dto/create-role-history.dto';
import { UpdateRoleHistoryDto } from './dto/update-role-history.dto';

@Injectable()
export class RoleHistoryService {
  constructor(
    @InjectRepository(RoleHistoryEntity)
    private roleHistoryRepository: Repository<RoleHistoryEntity>,
  ) {}

  async create(createRoleHistoryDto: CreateRoleHistoryDto): Promise<RoleHistoryEntity> {
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

  async update(id: number, updateRoleHistoryDto: UpdateRoleHistoryDto): Promise<RoleHistoryEntity> {
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
}

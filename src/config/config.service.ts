import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { ConfigEntity } from './entities/config.entity';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(ConfigEntity)
    private readonly configRepository: Repository<ConfigEntity>,
  ) {}

  async findOne(code: string) {
    try {
      const options: FindOneOptions<ConfigEntity> = {
        where: { code: code, status: 1 },
      };

      return await this.configRepository.findOne(options);
    } catch (e) {
      console.log({ error: e.message });
      return null;
    }
  }
}

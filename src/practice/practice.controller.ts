import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PracticeService } from './practice.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';

@UseGuards(AuthGuard)
@Controller('practice')
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Post()
  async create(@Body() createPracticeDto: CreatePracticeDto, @Request() req) {
    return await this.practiceService.create(createPracticeDto, req.user);
  }

  @Get()
  async findAll() {
    return await this.practiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.practiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.practiceService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.practiceService.remove(+id);
  }
}

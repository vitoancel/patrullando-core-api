import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { PracticeService } from './practice.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('practice')
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Post()
  async create(@Body() createPracticeDto: CreatePracticeDto, @Request() req) {
    return await this.practiceService.create(createPracticeDto, req.user);
  }
}

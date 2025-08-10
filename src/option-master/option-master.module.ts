import { Module } from '@nestjs/common';
import { OptionMasterService } from './option-master.service';
import { OptionMasterController } from './option-master.controller';

@Module({
  controllers: [OptionMasterController],
  providers: [OptionMasterService],
})
export class OptionMasterModule {}

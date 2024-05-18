import { Module } from '@nestjs/common';
import { ActService } from './act.service';
import { ActController } from './act.controller';
import { DBModule } from 'src/db/db.module';

@Module({
  imports: [DBModule],
  providers: [ActService],
  controllers: [ActController],
})
export class ActModule {}

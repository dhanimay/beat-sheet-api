import { Module } from '@nestjs/common';
import { BeatController } from 'src/beat/beat.controller';
import { BeatService } from 'src/beat/beat.service';
import { DBModule } from 'src/db/db.module';

@Module({
  imports: [DBModule],
  controllers: [BeatController],
  providers: [BeatService],
})
export class BeatModule {}

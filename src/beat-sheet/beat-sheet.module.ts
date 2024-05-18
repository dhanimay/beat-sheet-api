import { Module } from '@nestjs/common';
import { BeatSheetService } from './beat-sheet.service';
import { BeatSheetController } from './beat-sheet.controller';
import { DBModule } from 'src/db/db.module';

@Module({
  imports: [DBModule],
  controllers: [BeatSheetController],
  providers: [BeatSheetService],
})
export class BeatSheetModule {}

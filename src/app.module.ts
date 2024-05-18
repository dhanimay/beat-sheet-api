import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BeatSheetModule } from './beat-sheet/beat-sheet.module';
import { ActModule } from './act/act.module';
import { BeatModule } from './beat/beat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BeatSheetModule,
    ActModule,
    BeatModule,
  ],
})
export class AppModule {}

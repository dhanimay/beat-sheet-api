import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BeatSheetService } from './beat-sheet.service';
import {
  DeleteBeatSheetDto,
  UpdateBeatSheetDto,
  CreateBeatSheetDto,
  GetBeatSheetDto,
} from './beat-sheet.model';

@Controller('/sheet')
export class BeatSheetController {
  constructor(private _sheetService: BeatSheetService) {}

  @Get()
  async getSheets() {
    return this._sheetService.getSheets();
  }

  @Get('/:sheetId')
  async getSheet(@Param() { sheetId }: GetBeatSheetDto) {
    return this._sheetService.getSheet(sheetId);
  }

  @Post()
  async createSheet(@Body() { title }: CreateBeatSheetDto) {
    return this._sheetService.createSheet(title);
  }

  @Put()
  async updateSheet(@Body() { sheetId, title }: UpdateBeatSheetDto) {
    this._sheetService.updateSheet(sheetId, title);
    return { result: 'success' };
  }

  @Delete()
  async deleteSheet(@Body() { sheetId }: DeleteBeatSheetDto) {
    this._sheetService.deleteSheet(sheetId);
    return { result: 'success' };
  }
}

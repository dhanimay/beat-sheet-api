import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { ActService } from './act.service';
import { UpdateActDto, CreateActDto, DeleteActDto } from './act.model';

@Controller('/act')
export class ActController {
  constructor(private readonly _actService: ActService) {}

  @Post()
  async createAct(@Body() { sheetId, description }: CreateActDto) {
    return this._actService.createAct(sheetId, description);
  }

  @Put()
  async updateAct(@Body() { actId, description }: UpdateActDto) {
    this._actService.updateAct(actId, description);
    return { result: 'success' };
  }

  @Delete()
  async deleteAct(@Body() { actId }: DeleteActDto) {
    this._actService.deleteAct(actId);
    return { result: 'success' };
  }
}

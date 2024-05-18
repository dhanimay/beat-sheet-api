import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { BeatService } from './beat.service';
import {
  CreateBeatDto,
  DeleteBeatDto,
  UpdateBeatCameraAngleDto,
  UpdateBeatDurationDto,
  UpdateBeatDescriptionDto,
} from './beat.model';

@Controller('/beat')
export class BeatController {
  constructor(private readonly _beatService: BeatService) {}

  @Post()
  async creaetBeat(
    @Body() { actId, description, duration, cameraAngle }: CreateBeatDto,
  ) {
    return this._beatService.createBeat(
      actId,
      description,
      duration,
      cameraAngle,
    );
  }

  @Put('/description')
  async updateDescription(
    @Body() { beatId, description }: UpdateBeatDescriptionDto,
  ) {
    this._beatService.updateDescription(beatId, description);
    return { result: 'success' };
  }

  @Put('/duration')
  async updateDuration(@Body() { beatId, duration }: UpdateBeatDurationDto) {
    this._beatService.updateDuration(beatId, duration);
    return { result: 'success' };
  }

  @Put('/camera')
  async updateCameraAngle(
    @Body() { beatId, cameraAngle }: UpdateBeatCameraAngleDto,
  ) {
    this._beatService.updateCameraAngle(beatId, cameraAngle);
    return { result: 'success' };
  }

  @Delete()
  async deleteBeat(@Body() { beatId }: DeleteBeatDto) {
    this._beatService.deleteBeat(beatId);
    return { result: 'success' };
  }
}

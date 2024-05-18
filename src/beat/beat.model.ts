import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateBeatDto {
  @IsUUID()
  actId: string;

  @IsString()
  description: string;

  @IsNumber()
  duration: number;

  @IsString()
  cameraAngle: string;
}

export class UpdateBeatDescriptionDto {
  @IsUUID()
  beatId: string;

  @IsString()
  description?: string;
}

export class UpdateBeatDurationDto {
  @IsUUID()
  beatId: string;

  @IsNumber()
  duration?: number;
}

export class UpdateBeatCameraAngleDto {
  @IsUUID()
  beatId: string;

  @IsString()
  cameraAngle?: string;
}

export class DeleteBeatDto {
  @IsUUID()
  beatId: string;
}

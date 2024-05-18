import { IsString, IsUUID } from 'class-validator';

export class CreateActDto {
  @IsUUID()
  sheetId: string;

  @IsString()
  description: string;
}

export class UpdateActDto {
  @IsUUID()
  actId: string;

  @IsString()
  description: string;
}

export class DeleteActDto {
  @IsUUID()
  actId: string;
}

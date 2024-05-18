import { IsString, IsUUID } from 'class-validator';

export class CreateBeatSheetDto {
  @IsString()
  title: string;
}

export class GetBeatSheetDto {
  @IsUUID()
  sheetId: string;
}

export class DeleteBeatSheetDto {
  @IsUUID()
  sheetId: string;
}

export class UpdateBeatSheetDto {
  @IsUUID()
  sheetId: string;

  @IsString()
  title: string;
}

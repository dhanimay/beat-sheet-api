import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class BeatService {
  constructor(@Inject('PG_POOL') private _pg: Pool) {}

  async createBeat(
    actId: string,
    description: string,
    duration: number,
    cameraAngle: string,
  ) {
    const { rows } = await this._pg.query(
      `INSERT INTO "beat" ("act_id", "description", "duration", "camera_angle") values ($1,$2,$3,$4) returning id`,
      [actId, description, duration, cameraAngle],
    );
    return rows.at(0);
  }

  async updateDescription(beatId: string, description: string) {
    this._pg.query(`UPDATE "beat" SET description = $1 WHERE id = $2`, [
      description,
      beatId,
    ]);
  }

  async updateDuration(beatId: string, duration: number) {
    this._pg.query(`UPDATE "beat" SET duration = $1 WHERE id = $2`, [
      duration,
      beatId,
    ]);
  }

  async updateCameraAngle(beatId: string, cameraAngle: string) {
    this._pg.query(`UPDATE "beat" SET camera_angle = $1 WHERE id = $2`, [
      cameraAngle,
      beatId,
    ]);
  }

  async deleteBeat(beatId: string) {
    this._pg.query(`DELETE FROM "beat" WHERE id = $1`, [beatId]);
  }
}

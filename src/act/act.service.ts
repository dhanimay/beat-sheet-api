import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class ActService {
  constructor(@Inject('PG_POOL') private _pg: Pool) {}

  async createAct(sheetId: string, description: string) {
    const { rows } = await this._pg.query(
      `INSERT INTO "act" ("sheet_id", "description") values ($1, $2) returning id`,
      [sheetId, description],
    );
    return rows.at(0);
  }

  async updateAct(actId: string, description: string) {
    this._pg.query(`UPDATE "act" SET description = $1 WHERE id = $2`, [
      description,
      actId,
    ]);
  }

  async deleteAct(actId: string) {
    this._pg.query(`DELETE FROM "act" WHERE id = $1`, [actId]);
  }
}

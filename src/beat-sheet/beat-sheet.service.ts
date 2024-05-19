import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class BeatSheetService {
  constructor(@Inject('PG_POOL') private _pg: Pool) {}

  async getSheets() {
    const { rows } = await this._pg.query(
      'SELECT *, ' +
        '(SELECT COUNT(*) FROM "act" WHERE "act".sheet_id = "beat_sheet".id) AS "actCount" ' +
        'FROM "beat_sheet"',
    );
    return rows;
  }

  async getSheet(sheetId: string) {
    const { rows: titleRow } = await this._pg.query(
      'SELECT title FROM "beat_sheet" WHERE id = $1',
      [sheetId],
    );
    const { rows } = await this._pg.query(
      'SELECT ' +
        '"beat".description AS "beatDescription", "beat".camera_angle AS "cameraAngle", "beat".duration AS "duration", "beat".id AS "beatId", ' +
        '"act".description AS "actDescription", "act".id AS "actId", "beat".timestamp ' +
        'FROM "act" ' +
        'LEFT JOIN "beat" ON "beat".act_id = "act".id ' +
        'WHERE "act".sheet_id = $1 ORDER BY "act".timestamp, "beat".timestamp',
      [sheetId],
    );

    const title = titleRow.at(0).title;
    if (!rows?.length) {
      return { title, acts: [] };
    }


    const actMap = rows.reduce((sheet, curr) => {
      const beat = {
        id: curr.beatId,
        description: curr.beatDescription,
        duration: curr.duration,
        cameraAngle: curr.cameraAngle,
      };

      if (curr.actId in sheet) {
        sheet[curr.actId].beats.push(beat);
      } else {
        sheet[curr.actId] = {
          id: curr.actId,
          description: curr.actDescription,
          beats: [],
        };
        if (beat.id) {
          sheet[curr.actId].beats.push(beat);
        }
      }
      return sheet;
    }, {});

    return { title, acts: Object.values(actMap) };
  }

  async createSheet(title: string) {
    const { rows } = await this._pg.query(
      `INSERT INTO "beat_sheet" ("title") VALUES ($1) RETURNING id`,
      [title],
    );
    return rows.at(0);
  }

  async updateSheet(sheetId: string, title: string) {
    this._pg.query(`UPDATE "beat_sheet" SET title = $1 WHERE id = $2`, [
      title,
      sheetId,
    ]);
  }

  async deleteSheet(sheetId: string) {
    this._pg.query(`DELETE FROM "beat_sheet" WHERE id = $1`, [sheetId]);
  }
}

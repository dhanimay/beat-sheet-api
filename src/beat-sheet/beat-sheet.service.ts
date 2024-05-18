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
    const { rows } = await this._pg.query(
      'SELECT ' +
        '"beat".description as "beatDescription", "beat".camera_angle as "cameraAngle", "beat".duration as "duration", "beat".id as "beatId", ' +
        '"act".description as "actDescription", "act".id as "actId", ' +
        '"beat_sheet".title ' +
        'FROM "beat_sheet" ' +
        'LEFT JOIN "act" ON "act".sheet_id = "beat_sheet".id ' +
        'LEFT JOIN "beat" ON "beat".act_id = "act".id ' +
        'WHERE "act".sheet_id = $1',
      [sheetId],
    );

    if (!rows?.length) {
      return [];
    }

    const title = rows.at(0).title;

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
          actId: curr.actId,
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
      `INSERT INTO "beat_sheet" ("title") values ($1) returning id`,
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
    this._pg.query(`DELETE FROM "beat_sheet" where id = $1`, [sheetId]);
  }
}

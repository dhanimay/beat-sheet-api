import pg from 'pg';
const { Client } = pg;
import 'dotenv/config';

const client = new Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
});

await client.connect();

// Create BeatSheet Table
await client.query(
  'CREATE TABLE "beat_sheet" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "title" character varying NOT NULL, CONSTRAINT "PK_beat_sheet" PRIMARY KEY ("id"))',
);

// Create Act Table
await client.query(
  'CREATE TABLE "act" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "description" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "sheet_id" uuid NOT NULL, CONSTRAINT "PK_act" PRIMARY KEY ("id"), CONSTRAINT "FK_beat_sheet" FOREIGN KEY ("sheet_id") REFERENCES "beat_sheet"("id") ON DELETE CASCADE)',
);

// Create Beat Table
await client.query(
  'CREATE TABLE "beat" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "description" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "duration" INTEGER DEFAULT 0, "camera_angle" character varying, "act_id" uuid NOT NULL, CONSTRAINT "PK_beat" PRIMARY KEY ("id"), CONSTRAINT "FK_act" FOREIGN KEY ("act_id") REFERENCES "act"("id") ON DELETE CASCADE)',
);

await client.end();

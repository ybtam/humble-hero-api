import { db } from './index.js'
import {migrate} from "drizzle-orm/libsql/migrator";

async function runMigration() {

  await migrate(db, { migrationsFolder: './db/migrations' })
}

runMigration()

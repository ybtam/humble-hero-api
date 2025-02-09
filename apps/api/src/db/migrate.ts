import { migrate } from 'drizzle-orm/libsql/migrator'

import { db } from './index.js'

async function runMigration() {
  await migrate(db, { migrationsFolder: './db/migrations' })
}

runMigration()

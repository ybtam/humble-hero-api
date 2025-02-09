import { migrate } from 'drizzle-orm/libsql/migrator'

import { db } from './index.ts'

export async function runMigration() {
  await migrate(db, { migrationsFolder: './src/db/migrations' })
}

runMigration()

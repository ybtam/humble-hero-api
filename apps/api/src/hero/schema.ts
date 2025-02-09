import { sql } from 'drizzle-orm'
import { check, int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const heros = sqliteTable(
  'heros',
  {
    humilityScore: int('humility_score'),
    id: int('id').primaryKey({ autoIncrement: true }),
    name: text('name'),
    superpowers: text('superpowers'),
  },
  table => [
    check('humility_score_min', sql`${table.humilityScore} >= 1`),
    check('humility_score_max', sql`${table.humilityScore} <= 10`),
  ],
)

import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

import * as HeroSchema from '../hero/schema.js'

const client = createClient({
  url: process.env.DB_FILE_NAME ?? '',
})

export const db = drizzle(client, {
  schema: { ...HeroSchema },
})

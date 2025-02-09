import type { Config } from 'drizzle-kit'

export default {
  dbCredentials: {
    url: process.env.DB_FILE_NAME ?? '',
  },
  dialect: 'sqlite',
  out: './src/db/migrations',
  schema: ['./src/**/*/schema.ts'],
  strict: true,
  verbose: true,
} satisfies Config

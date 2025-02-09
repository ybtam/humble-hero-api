import { reset } from 'drizzle-seed'
import { Hono } from 'hono'
import { validator } from 'hono/validator'
import { z } from 'zod'

import { db } from '../db/index.js'
import { heros } from './schema.js'

const superheroes = new Hono()

superheroes.get('/', async c => {
  return c.json(await db.query.heros.findMany())
})

const createHeroSchema = z.object({
  humilityScore: z.number().min(0).max(10),
  name: z.string().min(2),
  superpowers: z.string().min(2),
})

superheroes.post(
  '/',
  validator('json', (value, c) => {
    const parsed = createHeroSchema.safeParse(value)
    if (!parsed.success) return c.json(parsed.error.formErrors.fieldErrors, 406)

    return parsed.data
  }),
  async c => {
    const data = c.req.valid('json')

    return c.json(await db.insert(heros).values(data).returning())
  },
)

//extra endpoint for first set up
export const seedHeros: (typeof heros.$inferInsert)[] = [
  { humilityScore: 5, name: 'Batman', superpowers: 'Super strength, speed, and reflexes' },
  { humilityScore: 9, name: 'Superman', superpowers: 'Flight, strength, and durability' },
  { humilityScore: 1, name: 'Thor', superpowers: 'Strength, speed, and durability' },
]

superheroes.post('/seed', async c => {
  await reset(db, { heros })

  const res = await db.insert(heros).values(seedHeros).returning()

  return c.json(res)
})

export default superheroes

import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import superheroes from './hero/routes.ts'

export const app = new Hono()

app.route('/superheroes', superheroes)

const port = 4000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
